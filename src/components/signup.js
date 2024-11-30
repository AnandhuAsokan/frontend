import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";


function Signup() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setSuccess("");
      const response = await axios.post(
        "http://localhost:8000/api/signup",
        {
          user_name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      

      if (response.status === 200) {
        setSuccess("User Registered Successfully");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Email already registered");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="user_name" className="col-form-label col-sm-3">
              Full Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="user_name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-form-label col-sm-3">
              Email Id
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="password" className="col-form-label col-sm-3">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="confirmPassword"
              className="col-form-label col-sm-3"
            >
              Confirm Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <div className="form-group text-center">
            <button type="submit" className="btn btn-outline" id="button">
              Signup
            </button>
            <div id="forgot-text">
            <p id="text">
              Already have an account?{" "}
              <Link to="/" className="password">
                Login here
              </Link>
            </p></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
