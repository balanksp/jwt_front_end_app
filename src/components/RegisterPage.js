// import React from 'react'

// const RegisterPage = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         roles: '' // Added role state
//       });

// // State to manage form submission status
// const [isSubmitting, setIsSubmitting] = useState(false);
// const [submissionStatus, setSubmissionStatus] = useState('');

// // Example roles for the dropdown
// const roles = ['ROLE_ADMIN', 'ROLE_USER' ];

// // Handle input changes
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//     ...formData,
//     [name]: value
//   });
// };

// // Handle form submission
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   try {
//     // Simulate form submission
//     // Replace this with actual API call if needed
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a network request

//     // On success
//     setSubmissionStatus('Registration successful!');
//   } catch (error) {
//     // On failure
//     setSubmissionStatus('Registration failed. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };


//     return (
//         <div>
//             this RegisterPage
//             <div>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     // value={formData.username}
//                     // onChange={handleChange}
//                     required
//                 />
//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                 />
//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password" />

//                 <label htmlFor="roles">Roles:</label>
//                 <select
//                     id="role"
//                     name="role"
//                     // value={formData.role}
//                     // onChange={handleChange}
//                     required
//                 >
//                     <option value="" disabled>Select a role</option>
//                     {/* {roles.map((role) => (
//               <option key={role} value={role}>{role}</option>
//             ))} */}
//                 </select>


//             </div>
//         </div>

//     )
// }

// export default RegisterPage;


import React, { useState } from 'react';

const RegisterPage = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

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
      // Make an API call to submit the form data
      const response = await fetch('http://localhost:9052/login/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


        // Log response status and body for debugging
        console.log('Response status:', response.status);
        const responseBody = await response.json();
        console.log('Response body:', responseBody);


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSubmissionStatus('Registration successful!');
      console.log('Success:', result);
    } catch (error) {
      setSubmissionStatus('Registration failed. Please try again.');
      // console.error('Error:', error);
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default RegisterPage;
