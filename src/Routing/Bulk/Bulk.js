import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const BulkReminder = () => {
  const [formData, setFormData] = useState({
    phoneNumbers: [""], // Initialize with an empty phone number field
    description: "",
    date: "",
    time: "",
    countryCode: "+91", // Default country code
    image: null,
  });

  const [errors, setErrors] = useState({
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

  const handlePhoneNumbersChange = (e, index) => {
    const { value } = e.target;
    const updatedPhoneNumbers = [...formData.phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      phoneNumbers: updatedPhoneNumbers,
    }));
  };

  const addPhoneNumberField = () => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumbers: [...prevData.phoneNumbers, ""],
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
  function concatenatePhoneNumbers(phoneNumbersArray) {
    if (!Array.isArray(phoneNumbersArray)) {
      return ""; // Return an empty string for non-array inputs
    }

    return phoneNumbersArray.join(">");
  }
  
  const removePhoneNumberField = (index) => {
    const updatedPhoneNumbers = [...formData.phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      phoneNumbers: updatedPhoneNumbers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const newErrors = {
      description: "",
      date: "",
      time: "",
    };

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
    let concatenatedPhoneNumbers; // Declare the variable at the top of the block

    if (
      !newErrors.description &&
      !newErrors.date &&
      !newErrors.time &&
      formData.phoneNumbers.length > 0 // At least one phone number is required
    ) 
    {
      // Concatenate phoneNumbers array into a single string
      concatenatedPhoneNumbers = concatenatePhoneNumbers(formData.phoneNumbers);
  
      // Clear validation error when the user starts typing again
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumbers: "", // Assuming you have a phoneNumbers field in errors
      }));
    }
    {
      try {
        // Send data to the backend (replace 'backendEndpoint' with your actual backend endpoint)
        await axios.post("http://localhost:3010/api/bulk", formData); // Modify the endpoint for bulk submission
        // Handle the response from the backend as needed
        // console.log("Backend Response:", response.data);
        alert("Data Submitted Successfully");

        // Show the success alert
      } catch (error) {
        alert("Error while Submitting data");
        console.error("Error sending data to the backend:", error.message);
      } finally {
        // Clear form values after submission
        setFormData({
          phoneNumbers: [""],
          description: "",
          date: "",
          time: "",
          countryCode: "+1",
          image: null,
        });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Team Meeting Details</h1>
      <form onSubmit={handleSubmit}>
        {formData.phoneNumbers.map((phoneNumber, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`phoneNumber${index}`} className="form-label">
              Phone Number {index + 1}:
            </label>
            <div className="input-group">
              <select
                id={`countryCode${index}`}
                name={`countryCode${index}`}
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
                id={`phoneNumber${index}`}
                name={`phoneNumber${index}`}
                value={phoneNumber}
                onChange={(e) => handlePhoneNumbersChange(e, index)}
                className={`form-control ${errors.phoneNumber && "is-invalid"}`}
                style={{ width: "70%" }} // Set a fixed width for the input
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removePhoneNumberField(index)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              )}
            </div>
            {errors.phoneNumber && (
              <div className="invalid-feedback">{errors.phoneNumber}</div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addPhoneNumberField}
          className="btn btn-primary"
        >
          Add Phone Number
        </button>
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
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
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
          {errors.time && <div className="invalid-feedback">{errors.time}</div>}
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

export default BulkReminder;
