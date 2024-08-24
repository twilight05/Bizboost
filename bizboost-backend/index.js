const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: 'https://bizboost-client.vercel.app', 
}));

app.use(bodyParser.json());

// Serve static files (if you have any frontend files in a 'public' directory)
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for submissions
let submissions = [];

// Middleware for validating form submissions
function validateSubmission(req, res, next) {
    const { name, email, company } = req.body;

    if (!name || !email || !company) {
        return res.status(400).send('Name, Email, and Company are required fields.');
    }

    next();
}

// Handle form submissions with validation
app.post('/submit', validateSubmission, (req, res) => {
    const { name, email, company, topic } = req.body;

    // Add the new submission to the submissions array
    submissions.push({
        Name: name,
        Email: email,
        Company: company,
        Topic: topic || 'N/A', // Handle optional topic field
        SubmittedAt: new Date().toISOString(), // Adding a timestamp
    });

    res.status(200).send('Form submitted successfully');
});

// Endpoint to download the Excel file
app.get('/download', (req, res) => {
    const ws = XLSX.utils.json_to_sheet(submissions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions');

    const uniqueFilename = `submissions_${uuidv4()}.xlsx`; // Generate a unique filename
    const filePath = path.join(__dirname, uniqueFilename);
    XLSX.writeFile(wb, filePath);

    res.download(filePath, uniqueFilename, (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
            return res.status(500).send('Error downloading the file');
        }

        // Delete the file after download to keep the server clean
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting the file:', unlinkErr);
            }
        });
    });
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to  Bizboost');
});

// Handle undefined routes
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
