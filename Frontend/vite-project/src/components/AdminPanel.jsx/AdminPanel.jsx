import React from 'react';

const AdminPanel = () => {
  // Ensure REACT_APP_API_URL is available
  const apiUrl = process.env.REACT_APP_API_URL;

  if (!apiUrl) {
    console.error("API URL is not defined in environment variables.");
    return <div>Error: API URL is not configured.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <a
        href={`${apiUrl}/download`}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        download="submissions.xlsx"
      >
        Download Submissions
      </a>
    </div>
  );
};

export default AdminPanel;
