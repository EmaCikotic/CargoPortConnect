import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
//https://www.npmjs.com/package/react-sweetalert2

// reference :https://getbootstrap.com/docs/4.0/components/forms/

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //??https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isValidForm = () => {
    const { name, email, phone, password, confirmPassword } = formData;

    return (
      name !== "" &&
      validateEmail(email) &&
      phone.length >= 7 &&
      phone.length <= 15 && //https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s03.html#:~:text=Thanks%20to%20the%20international%20phone,in%20use%20contain%20seven%20digits.
      phone.match(/^\+[0-9]{1,3}[\s-]?([0-9]{4,14})(?:x[0-9]+)?$/) &&
      password.length >= 8 &&
      password === confirmPassword
    );
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
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
    } else {
      navigate("/confirmation"); //2FA
      /*Swal.fire({
        title: "Registration Successful!",
        text: "Welcome, " + formData.name + "!",
        icon: "success",
        confirmButtonText: "OK",
      });*/
    }

    clearForm();
  };

  /*const checkifValid = () => {
    if (!isValidForm) {
      Swal({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the form correctly!",
      });
    } else {
      Swal({
        icon: "error",
        title: "Oops...",
        text: "Welcome",
      });
    }
  };*/

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
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
              <label htmlFor="phone" className="fw-bold">
                Phone Number*
              </label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                id="phone"
                name="phone"
                placeholder="+3867018202"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>

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
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label htmlFor="confirmPassword" className="fw-bold">
                Password Confirmation*
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
