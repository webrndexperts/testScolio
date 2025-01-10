// import React, { useState } from 'react';

// const ConsultationForm = () => {
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     phone1: '',
//     companyName: '',
//     message: ''
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       // Form is valid, submit data
//       console.log(formData);
//       // Clear form data after submission
//       setFormData({
//         firstname: '',
//         lastname: '',
//         email: '',
//         phone1: '',
//         companyName: '',
//         message: ''
//       });
//     } else {
//       // Set validation errors
//       setErrors(validationErrors);
//     }
//   };

//   const validateForm = (formData) => {
//     let errors = {};
//     // Validation logic for each field
//     if (!formData.firstname.trim()) {
//       errors.firstname = 'First Name is required';
//     }
//     if (!formData.lastname.trim()) {
//       errors.lastname = 'Last Name is required';
//     }
//     if (!formData.email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!isValidEmail(formData.email)) {
//       errors.email = 'Invalid email format';
//     }
//     if (!formData.phone1.trim()) {
//       errors.phone1 = 'Phone Number is required';
//     }
//     if (!formData.companyName.trim()) {
//       errors.companyName = 'Company/Organization Name is required';
//     }
//     return errors;
//   };

//   const isValidEmail = (email) => {
//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   return (
//     <div>
//       <h2>Consultation Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="firstname">First Name<span>*</span></label>
//           <input
//             type="text"
//             id="firstname"
//             name="firstname"
//             value={formData.firstname}
//             onChange={handleInputChange}
//             required
//           />
//           {errors.firstname && <p className="error">{errors.firstname}</p>}
//         </div>
//         <div>
//           <label htmlFor="lastname">Last Name<span>*</span></label>
//           <input
//             type="text"
//             id="lastname"
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleInputChange}
//             required
//           />
//           {errors.lastname && <p className="error">{errors.lastname}</p>}
//         </div>
//         <div>
//           <label htmlFor="email">Email<span>*</span></label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//           {errors.email && <p className="error">{errors.email}</p>}
//         </div>
//         <div>
//           <label htmlFor="phone1">Phone Number<span>*</span></label>
//           <input
//             type="text"
//             id="phone1"
//             name="phone1"
//             value={formData.phone1}
//             onChange={handleInputChange}
//             required
//           />
//           {errors.phone1 && <p className="error">{errors.phone1}</p>}
//         </div>
//         <div>
//           <label htmlFor="company1">Company or Organization Name<span>*</span></label>
//           <input
//             type="text"
//             id="company1"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleInputChange}
//             required
//           />
//           {errors.companyName && <p className="error">{errors.companyName}</p>}
//         </div>
//         <div>
//           <label htmlFor="message">Additional Information/Comments</label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             row="5"
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ConsultationForm;
