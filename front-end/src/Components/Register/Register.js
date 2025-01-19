import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Configuration";
import axios from "axios";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isValidForm = () => {
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
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
      email: "",
      password: "",
      confirmPassword: "",
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
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registration successful!",
          timer: 1500,
        });
        clearForm();
        navigate("/confirmation");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: response.data.message || "An unknown error occurred",
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          "An error occurred during registration.",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded-4">
          <h2 className="text-center mb-4">Register</h2>
          <h5 className="text-left mb-4">
            Fields marked with * are{" "}
            <strong className="border-bottom">mandatory</strong>
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="fw-bold">
                Name and Surname*
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                placeholder="Ema Čikotić"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
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
            <div className="form-group mb-3">
              <label htmlFor="password" className="fw-bold">
                Password*
              </label>
              <div className="input-group">
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
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="confirmPassword" className="fw-bold">
                Password Confirmation*
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="At least 8 characters"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-block">
                Create Profile
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-block mx-2"
                onClick={() => navigate("/signin")}
              >
                Already Have One?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
