import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Reminder.css"; // Import your custom CSS file

const Reminder = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    description: "",
    date: "",
    time: "",
    countryCode: "+91", // Default country code
    image: null,
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    description: "",
    date: "",
    time: "",
  });

  const [successMessage, setSuccessMessage] = useState(null); // State for success alert


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation checks
    const newErrors = {
      phoneNumber: "",
      description: "",
      date: "",
      time: "",
    };
  
    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits.";
    }
  
    if (formData.description.trim() === "") {
      newErrors.description = "Description is required.";
    }
  
    if (formData.date.trim() === "") {
      newErrors.date = "Date is required.";
    }
  
    if (formData.time.trim() === "") {
      newErrors.time = "Time is required.";
    }
  
    setErrors(newErrors);
  
    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      // There are errors, do not proceed with submission
      return;
    }
  
    try {
      // Send data to the backend (replace 'backendEndpoint' with your actual backend endpoint)
      await axios.post("http://localhost:3011/api", formData);
      // Handle the response from the backend as needed
      // console.log("Backend Response:", response.data);
      alert("Data Submitted Successfully");
  
      // Show the success alert
    } catch (error) {
      alert("Error while Submitting data");
      console.log(error);
      console.error("Error sending data to the backend:", error.message);
    } finally {
      // Clear form values after submission
      setFormData({
        phoneNumber: "",
        description: "",
        date: "",
        time: "",
        countryCode: "+1",
        image: null,
      });
    }
  };
  
    

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Reminder Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <div className="input-group">
            <select
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="form-select"
              style={{ width: "30%" }} // Set a fixed width for the select
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`form-control ${errors.phoneNumber && "is-invalid"}`}
              style={{ width: "70%" }} // Set a fixed width for the input
            />
          </div>
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`form-control ${errors.description && "is-invalid"}`}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`form-control ${errors.date && "is-invalid"}`}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className={`form-control ${errors.time && "is-invalid"}`}
          />
          {errors.time && (
            <div className="invalid-feedback">{errors.time}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image (Optional):
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        {formData.image && (
          <div className="mb-3">
            <img
              src={formData.image}
              alt="Preview"
              className="image-preview mt-2"
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reminder;
