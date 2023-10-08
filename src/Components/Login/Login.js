import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: '+91',
      phoneNumber: '',
      password: '',
      errors: {
        phoneNumber: '',
        password: '',
      },
      redirectToDashboard: false,
    };
  }

  handleCountryCodeChange = (event) => {
    this.setState({ countryCode: event.target.value });
  };

  handlePhoneNumberChange = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  validateForm = () => {
    const { phoneNumber, password } = this.state;

    const errors = {
      phoneNumber: phoneNumber.trim() === '' ? 'Phone Number is required.' : '',
      password: password.trim() === '' ? 'Password is required.' : '',
    };

    this.setState({ errors });

    // Return true if there are no errors, indicating the form is valid
    return Object.values(errors).every((error) => error === '');
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (!this.validateForm()) {
      // If there are validation errors, do not submit the form
      return;
    }

    const { countryCode, phoneNumber, password } = this.state;

    try {
      const response = await fetch('http://localhost:3011/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countryCode,
          phoneNumber,
          password,
        }),
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful');

        // Set the state to redirect to the dashboard
        this.setState({ redirectToDashboard: true });

        // Clear input values after successful submission
        this.setState({
          countryCode: '+91',
          phoneNumber: '',
          password: '',
          errors: {
            phoneNumber: '',
            password: '',
          },
        });
      } else {
        // Handle unsuccessful login
        alert('Login failed. Please check your credentials.');
        console.log('Login failed');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  render() {
    const { countryCode, phoneNumber, password, errors, redirectToDashboard } = this.state;

    // Redirect to the dashboard if redirectToDashboard is true
    if (redirectToDashboard) {
      return <Navigate to="/reminder" />;
    }

    return (
      <div className="login-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-15">
            <form onSubmit={this.handleSubmit}>
              <h3 className="mb-4">Login</h3>

              <div className="mb-3 row">
                <div className="col-md-3">
                  <label>Country Code</label>
                  <select
                    className="form-select"
                    onChange={this.handleCountryCodeChange}
                    value={countryCode}
                  >
                    <option value="+1">+1 (USA)</option>
                    <option value="+91">+91 (India)</option>
                  </select>
                </div>

                <div className="col-md-9">
                  <label>Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">{countryCode}</span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter phone number"
                      pattern="[0-9]{10}"
                      required
                      value={phoneNumber}
                      onChange={this.handlePhoneNumberChange}
                    />
                  </div>
                  {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={this.handlePasswordChange}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
