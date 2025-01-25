import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Configuration";

const AddContainer = () => {
  const navigate = useNavigate();

  const [containerDetails, setContainerDetails] = useState({
    container_number: "",
    container_type: "",
    cargo_description: "",
    shipping_line: "",
    port_of_origin: "",
    port_of_destination: "",
    ship_name: "",
    voyage: "",
    etd: "",
    eta: "",
    bl_number: "",
    booking_number: "",
    hazardous_material: false,
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
    if (!containerDetails.container_number)
      newErrors.container_number = "Container number is required";
    if (!containerDetails.container_type)
      newErrors.container_type = "Container type is required";
    if (!containerDetails.cargo_description)
      newErrors.cargo_description = "Cargo description is required";
    if (!containerDetails.shipping_line)
      newErrors.shipping_line = "Shipping line is required";
    if (!containerDetails.port_of_origin)
      newErrors.port_of_origin = "Port of origin is required";
    if (!containerDetails.port_of_destination)
      newErrors.port_of_destination = "Port of destination is required";
    if (!containerDetails.ship_name)
      newErrors.ship_name = "Ship name is required";
    if (!containerDetails.voyage) newErrors.voyage = "Voyage is required";
    if (!containerDetails.etd) newErrors.etd = "ETD is required";
    if (!containerDetails.eta) newErrors.eta = "ETA is required";
    if (!containerDetails.bl_number)
      newErrors.bl_number = "B/L number is required";
    if (!containerDetails.booking_number)
      newErrors.booking_number = "Booking number is required";

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

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "You must be logged in.", "error");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/containers/addcontainer`,
        containerDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );

      if (response.status === 201) {
        Swal.fire("Success!", "Container added successfully!", "success");
        navigate("/collection"); // Redirect after successful addition
      }
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire("Error", "Session expired. Please log in again.", "error");
        navigate("/login");
      } else {
        Swal.fire("Error", "Failed to add container.", "error");
      }
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
              <label htmlFor="containerType" className="fw-bold">
                Container Type*
              </label>
              <select
                className={`form-control ${
                  error.container_type ? "is-invalid" : ""
                }`}
                id="containerType"
                name="container_type"
                value={containerDetails.container_type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="20ft Standard">20ft Standard</option>
                <option value="40ft Standard">40ft Standard</option>
                <option value="Refrigerated">Refrigerated</option>
              </select>
              {error.container_type && (
                <div className="invalid-feedback">{error.container_type}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="cargoDescription" className="fw-bold">
                Cargo Description*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.cargo_description ? "is-invalid" : ""
                }`}
                id="cargoDescription"
                name="cargo_description"
                placeholder="Enter cargo description"
                value={containerDetails.cargo_description}
                onChange={handleChange}
              />
              {error.cargo_description && (
                <div className="invalid-feedback">
                  {error.cargo_description}
                </div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="shippingLine" className="fw-bold">
                Shipping Line*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.shipping_line ? "is-invalid" : ""
                }`}
                id="shippingLine"
                name="shipping_line"
                placeholder="Enter shipping line"
                value={containerDetails.shipping_line}
                onChange={handleChange}
              />
              {error.shipping_line && (
                <div className="invalid-feedback">{error.shipping_line}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="portOfOrigin" className="fw-bold">
                Port of Origin*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.port_of_origin ? "is-invalid" : ""
                }`}
                id="portOfOrigin"
                name="port_of_origin"
                placeholder="Enter port of origin"
                value={containerDetails.port_of_origin}
                onChange={handleChange}
              />
              {error.port_of_origin && (
                <div className="invalid-feedback">{error.port_of_origin}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="portOfDestination" className="fw-bold">
                Port of Destination*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.port_of_destination ? "is-invalid" : ""
                }`}
                id="portOfDestination"
                name="port_of_destination"
                placeholder="Enter port of destination"
                value={containerDetails.port_of_destination}
                onChange={handleChange}
              />
              {error.port_of_destination && (
                <div className="invalid-feedback">
                  {error.port_of_destination}
                </div>
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
              <label htmlFor="voyage" className="fw-bold">
                Voyage*
              </label>
              <input
                type="text"
                className={`form-control ${error.voyage ? "is-invalid" : ""}`}
                id="voyage"
                name="voyage"
                placeholder="Enter voyage"
                value={containerDetails.voyage}
                onChange={handleChange}
              />
              {error.voyage && (
                <div className="invalid-feedback">{error.voyage}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="etd" className="fw-bold">
                ETD (Estimated Time of Departure)*
              </label>
              <input
                type="date"
                className={`form-control ${error.etd ? "is-invalid" : ""}`}
                id="etd"
                name="etd"
                value={containerDetails.etd}
                onChange={handleChange}
              />
              {error.etd && <div className="invalid-feedback">{error.etd}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="eta" className="fw-bold">
                ETA (Estimated Time of Arrival)*
              </label>
              <input
                type="date"
                className={`form-control ${error.eta ? "is-invalid" : ""}`}
                id="eta"
                name="eta"
                value={containerDetails.eta}
                onChange={handleChange}
              />
              {error.eta && <div className="invalid-feedback">{error.eta}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="blNumber" className="fw-bold">
                Bill of Lading (B/L) Number*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.bl_number ? "is-invalid" : ""
                }`}
                id="blNumber"
                name="bl_number"
                placeholder="Enter B/L number"
                value={containerDetails.bl_number}
                onChange={handleChange}
              />
              {error.bl_number && (
                <div className="invalid-feedback">{error.bl_number}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="bookingNumber" className="fw-bold">
                Booking Number*
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.booking_number ? "is-invalid" : ""
                }`}
                id="bookingNumber"
                name="booking_number"
                placeholder="Enter booking number"
                value={containerDetails.booking_number}
                onChange={handleChange}
              />
              {error.booking_number && (
                <div className="invalid-feedback">{error.booking_number}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="hazardousMaterial" className="fw-bold">
                Hazardous Material
              </label>
              <input
                className="mx-2"
                type="checkbox"
                id="hazardousMaterial"
                name="hazardous_material"
                checked={containerDetails.hazardous_material}
                onChange={handleChange}
              />
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
