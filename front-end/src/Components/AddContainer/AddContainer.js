import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Configuration";

const AddContainer = () => {
  const navigate = useNavigate();

  const [containerDetails, setContainerDetails] = useState({
    container_number: "",
    arrival_date: "",
    departure_date: "",
    ship_name: "",
    ship_voyage: "",
    BL_number: "",
    consignee: "",
    shipper: "",
    origin_port: "",
    destination_port: "",
  });

  const [error, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContainerDetails({
      ...containerDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isValidForm = () => {
    const newErrors = {};
    const requiredFields = [
      "container_number",
      "arrival_date",
      "departure_date",
      "ship_name",
      "ship_voyage",
      "BL_number",
      "consignee",
      "shipper",
      "origin_port",
      "destination_port",
    ];

    requiredFields.forEach((field) => {
      if (!containerDetails[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in the form correctly!",
      });
      return;
    }

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You must be logged in to add a container.",
      });
      navigate("/login");
      return;
    }

    try {
      const payload = { ...containerDetails, user_id };

      //debugging
      console.log("Sending payload:", payload);

      const response = await axios.post(
        `${API_URL}/api/containers/addcontainer`,
        payload
      );

      if (response.status === 201) {
        Swal.fire("Success!", "Container added successfully!", "success");
        navigate("/collection");
      }
    } catch (error) {
      console.error("Error adding container:", error.response || error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add container.",
        "error"
      );
    }
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded-4">
          <h2 className="text-center mb-4">Add Container</h2>
          <h5 className="text-left mb-4">
            Fields marked with * are{" "}
            <strong className="border-bottom">mandatory</strong>
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="containerNumber" className="fw-bold">
                Container Number*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.container_number ? "is-invalid" : ""
                }`}
                id="containerNumber"
                name="container_number"
                placeholder="Enter container number"
                value={containerDetails.container_number}
                onChange={handleChange}
              />
              {error.container_number && (
                <div className="invalid-feedback">{error.container_number}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="arrival_date" className="fw-bold">
                ETA (Estimated Time of Arrival)*
              </label>
              <input
                type="date"
                className={`form-control ${
                  error.arrival_date ? "is-invalid" : ""
                }`}
                id="arrival_date"
                name="arrival_date"
                value={containerDetails.arrival_date}
                onChange={handleChange}
              />
              {error.arrival_date && (
                <div className="invalid-feedback">{error.arrival_date}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="departure_date" className="fw-bold">
                ETD (Estimated Time of Departure)*
              </label>
              <input
                type="date"
                className={`form-control ${
                  error.departure_date ? "is-invalid" : ""
                }`}
                id="departure_date"
                name="departure_date"
                value={containerDetails.departure_date}
                onChange={handleChange}
              />
              {error.departure_date && (
                <div className="invalid-feedback">{error.departure_date}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="shipName" className="fw-bold">
                Ship Name*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.ship_name ? "is-invalid" : ""
                }`}
                id="shipName"
                name="ship_name"
                placeholder="Enter ship name"
                value={containerDetails.ship_name}
                onChange={handleChange}
              />
              {error.ship_name && (
                <div className="invalid-feedback">{error.ship_name}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="ship_voyage" className="fw-bold">
                Voyage*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.ship_voyage ? "is-invalid" : ""
                }`}
                id="ship_voyage"
                name="ship_voyage"
                placeholder="Enter voyage"
                value={containerDetails.ship_voyage}
                onChange={handleChange}
              />
              {error.ship_voyage && (
                <div className="invalid-feedback">{error.ship_voyage}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="BL_number" className="fw-bold">
                Bill of Lading (B/L) Number*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.BL_number ? "is-invalid" : ""
                }`}
                id="BL_number"
                name="BL_number"
                placeholder="Enter B/L number"
                value={containerDetails.BL_number}
                onChange={handleChange}
              />
              {error.BL_number && (
                <div className="invalid-feedback">{error.BL_number}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="consignee" className="fw-bold">
                Consignee*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.consignee ? "is-invalid" : ""
                }`}
                id="consignee"
                name="consignee"
                placeholder="Enter consignee"
                value={containerDetails.consignee}
                onChange={handleChange}
              />
              {error.consignee && (
                <div className="invalid-feedback">{error.consignee}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="shipper" className="fw-bold">
                Shipper*
              </label>
              <input
                type="text"
                className={`form-control ${error.shipper ? "is-invalid" : ""}`}
                id="shipper"
                name="shipper"
                placeholder="Enter Shipper"
                value={containerDetails.shipper}
                onChange={handleChange}
              />
              {error.shipper && (
                <div className="invalid-feedback">{error.shipper}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="origin_port" className="fw-bold">
                Port of Origin*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.origin_port ? "is-invalid" : ""
                }`}
                id="origin_port"
                name="origin_port"
                placeholder="Enter port of origin"
                value={containerDetails.origin_port}
                onChange={handleChange}
              />
              {error.origin_port && (
                <div className="invalid-feedback">{error.origin_port}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="destination_port" className="fw-bold">
                Port of Destination*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.destination_port ? "is-invalid" : ""
                }`}
                id="destination_port"
                name="destination_port"
                placeholder="Enter port of destination"
                value={containerDetails.destination_port}
                onChange={handleChange}
              />
              {error.destination_port && (
                <div className="invalid-feedback">{error.destination_port}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContainer;
