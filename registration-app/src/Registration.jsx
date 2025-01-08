import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/register", formData);
      alert("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      alert("Error during registration");
    }
  };

  return (
    <div className="container mt-5 bg-light p-4">
      <h2 className="text-center">Register</h2>
      <div className="col-md-6 mx-auto mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        <p className="text-center">or</p>
        <a
          type="button" className="btn btn-secondary w-100" href="/login">Login</a>
        <div className="mt-3 d-flex justify-content-center">
          <button className="btn btn-outline-danger">Login with Google</button>
          <button className="btn btn-outline-primary mx-2">Login with Facebook</button>
          <button className="btn btn-outline-dark">Login with Apple ID</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Registration;
