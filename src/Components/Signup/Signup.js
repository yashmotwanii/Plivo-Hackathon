import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    countryCode: '+91',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    countryCode: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      countryCode: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    };

    if (formData.phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits.';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required.';
    }

    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (
      !newErrors.countryCode &&
      !newErrors.phoneNumber &&
      !newErrors.password &&
      !newErrors.confirmPassword
    ) {
      try {
        const response = await axios.post('http://localhost:3011/signup', formData);

        if (response.status === 200) {
          alert("Registered Successful");
          console.log('Signup successful!');
          setFormData({
            countryCode: '+91',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
          });
        } else {
          alert('Signup failed. Please try again.');
          console.log('Signup failed');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-15 row">
          <div className="col">
            <label htmlFor="countryCode" className="form-label">
              Country Code:
            </label>
            <select
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className={`form-select ${errors.countryCode && 'is-invalid'}`}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              {/* Add more country codes as needed */}
            </select>
            {errors.countryCode && <div className="invalid-feedback">{errors.countryCode}</div>}
          </div>

          <div className="col">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <div className="input-group">
              <span className="input-group-text">{formData.countryCode}</span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`form-control ${errors.phoneNumber && 'is-invalid'}`}
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                required
              />
            </div>
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-control ${errors.password && 'is-invalid'}`}
            placeholder="Enter password"
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
            placeholder="Confirm password"
            required
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
