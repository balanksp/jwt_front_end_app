// import React from 'react'

// const LoginPage = () => {

//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//       });

//       // State to manage form submission status
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState('');

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [username]: value

//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//   try {
//     console.log('Form data:', formData);

//     // Make an API call to submit the form data
//     const response = await fetch('http://localhost:9052/login/authenticate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
    
//       console.log('Response headers:', response.headers.get('Content-Type'));
//       console.log('Response status:', response.status);

//   } catch (error) {
    
//   }


//   }

//     return (
//         <div>
//             this loginPage
//             <form>
//                 <div>
//                     <label htmlFor="name">Username:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                         disabled={isUserExists}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         disabled={isUserExists}
//                     />
//                 </div>
//                 </form>
//         </div>
//     )
// }

// export default LoginPage;