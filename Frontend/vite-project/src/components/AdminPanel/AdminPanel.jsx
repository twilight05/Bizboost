import React from 'react';

const AdminPanel = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <a
                href="http://localhost:5000/download"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                download="submissions.xlsx"
            >
                Download Submissions
            </a>
        </div>
    );
};

export default AdminPanel;
