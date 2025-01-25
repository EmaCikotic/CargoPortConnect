import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Configuration";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Validate the form
  const isValidForm = () => {
    const { email, password } = formData;
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting login form:", formData);

    try {
      const response = await axios.post(`${API_URL}/api/users/login`, formData);

      console.log("Full backend response:", response); // Log the full response

      if (response.status === 200) {
        const token = response.data.token;
        const userId = response.data.user_id;

        console.log("Token:", token); // Log the token
        console.log("User ID:", userId); // Log the user ID

        localStorage.setItem("token", token);
        localStorage.setItem("user_id", userId);

        Swal.fire("Login successful", "", "success").then(() => {
          navigate("/addContainer");
        });
      }
    } catch (error) {
      console.error("Login error:", error); // Log any errors
      Swal.fire(
        "Login failed",
        error.response?.data?.message || "Error",
        "error"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded-3 shadow">
          <h2 className="text-center mb-4">Login</h2>
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
                required
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
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
