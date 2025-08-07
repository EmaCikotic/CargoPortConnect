import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Configuration";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const isValidForm = () => {
    const { name, surname, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name || name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (!surname || surname.length < 2)
      newErrors.surname = "Surname must be at least 2 characters";
    if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    });
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
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registration successful! Please log in.",
          timer: 1500,
        });
        clearForm();
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          text: "A user with this email already exists.",
        });
        setFormData((prevState) => ({ ...prevState, email: "" }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "An unknown error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-4 bg-light  p-3 rounded-3 shadow-sm">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group mb-3">
              <label htmlFor="name" className="fw-bold">
                Name*
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                placeholder="Ema"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Surname Field */}
            <div className="form-group mb-3">
              <label htmlFor="surname" className="fw-bold">
                Surname*
              </label>
              <input
                type="text"
                className={`form-control ${errors.surname ? "is-invalid" : ""}`}
                id="surname"
                name="surname"
                placeholder="Čikotić"
                value={formData.surname}
                onChange={handleChange}
              />
              {errors.surname && (
                <div className="invalid-feedback">{errors.surname}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="fw-bold">
                Email*
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                placeholder="emacikotic25@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group mb-3">
              <label htmlFor="password" className="fw-bold">
                Password*
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                name="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword" className="fw-bold">
                Confirm Password*
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="form-group mb-3">
              <label htmlFor="role" className="fw-bold">
                Role*
              </label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Toggle Password Visibility */}
            <div className="mb-3">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              Show Password
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
