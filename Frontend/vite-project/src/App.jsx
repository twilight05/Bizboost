// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import AdminPanel from './components/AdminPanel/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for Admin Panel */}
        <Route path="/adminpanel" element={<AdminPanel />} />

        {/* Redirect all other routes to the Landing Page */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
