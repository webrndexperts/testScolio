// PasswordRecoveryPage.js

import React, { useState } from 'react';

const PasswordRecoveryPage = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    // Add validation logic (e.g., check for required fields, valid email format, etc.)
    // Example validation: Check if email is provided
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Implement logic to handle password recovery
      console.log('Form submitted with data:', formData);
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <div className="container">
      <h2>Password Recovery</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <div className="invalid-feedback">{formErrors.email}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Recover Password
        </button>
      </form>
    </div>
  );
};

export default PasswordRecoveryPage;
