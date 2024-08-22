import happyPeople from "../../../public/Images/happyPeople.jpg";
import React, { useState } from 'react';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitted) {
      alert("You've already submitted the form!");
      return;
    }

    // Ensure REACT_APP_API_URL is available
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
      console.error("API URL is not defined in environment variables.");
      alert("Server configuration error. Please try again later.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your submission was successful!");
        setSubmitted(true);
      } else {
        alert("There was an issue with your submission, please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an issue with your submission, please try again.");
    }
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Header Section */}
      <header
        className="bg-cover bg-center bg-no-repeat text-white text-center py-20 sm:py-16 md:py-24 lg:py-32"
        style={{
          backgroundImage: `url(${happyPeople})`,
        }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4">
          Bizboost
        </h1>
        <span className="text-xl sm:text-2xl">by</span>
        <p className="text-pink-500 text-4xl sm:text-5xl md:text-6xl">Creative Chaos</p>
        <p className="text-lg sm:text-xl mt-6 mb-4">Monthly Masterclasses for SMEs</p>
        <a href="#register-form">
          <button className="bg-white text-blue-950 hover:bg-pink-500 hover:text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md transition">
            Register Now
          </button>
        </a>
      </header>

      {/* What is Bizboost Section */}
      <section className="bg-gradient-to-r from-blue-950 to-pink-500 text-white text-center py-16 sm:py-20 md:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-950">What is Bizboost?</h2>
        <p className="text-lg sm:text-xl mb-4">
          Bizboost is a monthly masterclass series designed to empower small and medium enterprises (SMEs) with the knowledge and tools needed to succeed.
        </p>
        <ul className="max-w-md mx-auto mt-8 text-left">
          <li className="mb-4">
            <p>Network with like-minded entrepreneurs</p>
          </li>
          <li className="mb-4">
            <p>Gain actionable insights from industry experts</p>
          </li>
          <li className="mb-4">
            <p>Learn practical strategies to grow your business</p>
          </li>
          <li className="mb-4">
            <p>Access valuable resources and templates</p>
          </li>
        </ul>
      </section>

      {/* Upcoming Event Section */}
      <section className="bg-gray-50 text-center py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-pink-500">Next Masterclass Topic</h2>
        <p className="text-lg sm:text-xl mb-8">Date and Time: 31st, August 2024</p>
        <a href="#register-form">
          <button className="bg-blue-500 text-white hover:bg-pink-500 font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md transition">
            Register Now
          </button>
        </a>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white text-center py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-500">What Our Attendees Say</h2>
        <div className="max-w-md mx-auto space-y-4">
          <blockquote className="text-lg sm:text-xl italic">"This masterclass was a game-changer for our business!"</blockquote>
          <p>- John Doe, XYZ Company</p>
          <blockquote className="text-lg sm:text-xl italic">"Incredible insights and practical strategies."</blockquote>
          <p>- Jane Smith, ABC Ltd.</p>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register-form" className="bg-gray-50 text-center py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-500">Register for this Seminar</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="topic"
            placeholder="Preferred Topic Areas (optional)"
            value={formData.topic}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label className="text-gray-700">I agree to the Privacy Policy</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-pink-500 transition"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-950 text-white text-center py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Don't Miss Out!</h2>
        <button className="bg-pink-500 text-white hover:bg-white hover:text-blue-950 font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-md transition">
          Register Now
        </button>
        <p className="text-lg sm:text-xl mt-4">Limited Time Offer: Limited seats available.</p>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6 sm:py-8">
        <p>© 2024 Bizboost. All rights reserved.</p>
        <p>About Creative Chaos: Empowering businesses with cutting-edge solutions and strategies.</p>
        <p>Contact Us: info@creativechaos.com | +234 904 974 3538</p>
        <div className="mt-4">
          <a href="#" className="text-blue-950 underline">Privacy Policy</a>
        </div>
        <div className="mt-4">
          <button className="bg-blue-950 text-white hover:bg-pink-600 font-semibold py-2 px-4 rounded-md transition">
            Subscribe to Our Newsletter
          </button>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
