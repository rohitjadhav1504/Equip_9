import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    mobileNumber: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8082/login", {
        params: {
          mobileNumber: loginData.mobileNumber,
          password: loginData.password,
        },
      });
      const user = response.data; // Assuming backend sends user details
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (error) {
      setErrorMessage("Invalid credentials or error occurred!");
    }
  };

  return (
    <div className="container mt-5 bg-light p-4">
      <h2 className="text-center">Login</h2>
      <div className="col-md-6 mx-auto mt-4">
      <form onSubmit={handleSubmit}>
      {errorMessage && <div className="mt-3 alert alert-danger">{errorMessage}</div>}
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
          Login
        </button>
        <p className="text-center">or</p>
        <a href="/" className="btn btn-secondary w-100">Register</a>
      </form>
      </div>
    </div>
  );
};

export default Login;
