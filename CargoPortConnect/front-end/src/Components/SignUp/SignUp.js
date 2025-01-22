import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Configuration";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isValidForm = () => {
    const { email, password } = formData;
    return validateEmail(email) && password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the form correctly!",
        allowOutsideClick: false,
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/users/register`, {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Failed to Log In",
          text: "Incorrect email or password. Please try again.",
          allowOutsideClick: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again later.",
          allowOutsideClick: false,
        });
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded-4">
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="fw-bold">
                Email*
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="form-group mb-3">
              <label htmlFor="password" className="fw-bold">
                Password*
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                name="password"
                placeholder="Enter at least 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
