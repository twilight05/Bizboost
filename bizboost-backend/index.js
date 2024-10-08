const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for your frontend URL
app.use(cors({
    origin: 'https://bizboost-client.vercel.app',  // Replace with your frontend URL
    methods: 'GET,POST',  // Specify allowed methods
    allowedHeaders: 'Content-Type',  // Specify allowed headers
    
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
    try {
        const ws = XLSX.utils.json_to_sheet(submissions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Submissions');

        // Generate the Excel file in memory
        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

        const uniqueFilename = `submissions_${uuidv4()}.xlsx`; // Generate a unique filename

        // Set the headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${uniqueFilename}"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send the buffer directly as the response
        res.send(buffer);

    } catch (error) {
        console.error('Error in /download route:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Bizboost');
});

// Handle undefined routes
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
