import React, { useState } from 'react';

const LoginPage = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: '',
    password: ''
    // roles: ''
  });

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

//   const roles = ['ROLE_ADMIN', 'ROLE_USER'];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Form data:', formData);
      // Make an API call to submit the form data
      const response = await fetch('http://localhost:9052/login/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response headers:', response.headers.get('Content-Type'));
      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error('Network response was not ok');
        throw new Error('Network response was not ok');
      }

      // Read the response body
      const responseBody = await response.text();
      console.log('Response body:', responseBody);

      // Assuming the response body contains the JWT token
      setSubmissionStatus('Login successful!');
      localStorage.setItem('token', responseBody); // Store the token in local storage

    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default LoginPage;
