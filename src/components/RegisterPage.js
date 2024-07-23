import React, { useState } from 'react';

const RegisterPage = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: ''
  });

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isUserExists, setIsUserExists] = useState(false);

  // Example roles for the dropdown
  const roles = ['ROLE_ADMIN', 'ROLE_USER'];

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
      const response = await fetch('http://localhost:9052/login/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response headers:', response.headers.get('Content-Type'));
      console.log('Response status:', response.status);
       
      const responseBody = await response.text();
 
      if (!response.ok) {
        // console.error('Network response was not ok'); 
        setSubmissionStatus(responseBody.message || 'Registration failed. Please try again.');
        console.log('----------->',responseBody.message);
        setIsUserExists(true);
        throw new Error('Network response was not ok');
      }

      setSubmissionStatus(responseBody.message || 'Registration successful!');
      setIsUserExists(false); // Set user exists flag to false
      // setFormData({
      //   name: '',
      //   email: '',
      //   password: '',
      //   roles: ''
      // });

      // Read the response as text for logging
      // const responseText = await response.text();
      // console.log('Response text:', responseText);
      // setSubmissionStatus('Registration successful!');
    }
    
    catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('Registration failed. Please try again.');

    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Register the user</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isUserExists}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isUserExists}
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
            disabled={isUserExists}
          />
        </div>
        <div>
          <label htmlFor="roles">Role:</label>
          <select
            id="roles"
            name="roles"
            value={formData.roles}
            onChange={handleChange}
            required
            disabled={isUserExists}
          >
            <option value="" disabled>Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isUserExists || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default RegisterPage;
