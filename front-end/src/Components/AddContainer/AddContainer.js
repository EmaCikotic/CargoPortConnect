import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Configuration";

function toDateOnlyString(d) {
  // Format a Date -> "YYYY-MM-DD" for <input type="date">
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function dayBefore(yyyy_mm_dd) {
  const d = new Date(`${yyyy_mm_dd}T00:00:00`);
  d.setDate(d.getDate() - 1);
  return toDateOnlyString(d);
}
function dayAfter(yyyy_mm_dd) {
  const d = new Date(`${yyyy_mm_dd}T00:00:00`);
  d.setDate(d.getDate() + 1);
  return toDateOnlyString(d);
}

const AddContainer = () => {
  const navigate = useNavigate();

  const [containerDetails, setContainerDetails] = useState({
    container_number: "",
    arrival_date: "",     // ETA
    departure_date: "",   // ETD
    ship_name: "",
    ship_voyage: "",
    BL_number: "",
    consignee: "",
    shipper: "",
    origin_port: "",
    destination_port: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContainerDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isValidForm = () => {
    const newErrors = {};
    const requiredFields = [
      "container_number",
      "arrival_date",      // ETA
      "departure_date",    // ETD
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

    // Strict date rule: ETD (departure) must be BEFORE ETA (arrival)
    const { arrival_date, departure_date } = containerDetails;
    if (arrival_date && departure_date) {
      const eta = Date.parse(`${arrival_date}T00:00:00`);
      const etd = Date.parse(`${departure_date}T00:00:00`);
      if (etd >= eta) {
        newErrors.departure_date = "ETD (departure) must be before ETA (arrival).";
        newErrors.arrival_date = "ETA (arrival) must be after ETD (departure).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      Swal.fire({
        icon: "error",
        title: "Please check the form",
        text: "Make sure all required fields are filled and ETD is before ETA.",
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
        <div className="col-md-5 bg-light p-4 rounded-4">
          <h3 className="text-center mb-4">Add Container</h3>
          <h5 className="text-left mb-4">
            Fields marked with * are{" "}
            <strong className="border-bottom">mandatory</strong>
          </h5>

          <form onSubmit={handleSubmit}>
            {/* Container Number */}
            <div className="form-group mb-3">
              <label htmlFor="containerNumber" className="fw-bold">
                Container Number*
              </label>
              <input
                type="text"
                className={`form-control ${errors.container_number ? "is-invalid" : ""}`}
                id="containerNumber"
                name="container_number"
                placeholder="Enter container number"
                value={containerDetails.container_number}
                onChange={handleChange}
              />
              {errors.container_number && (
                <div className="invalid-feedback">{errors.container_number}</div>
              )}
            </div>

            {/* ETD */}
            <div className="form-group mb-3">
              <label htmlFor="departure_date" className="fw-bold">
                ETD (Estimated Time of Departure)*
              </label>
              <input
                type="date"
                className={`form-control ${errors.departure_date ? "is-invalid" : ""}`}
                id="departure_date"
                name="departure_date"
                value={containerDetails.departure_date}
                onChange={handleChange}
                // Must be strictly before ETA if ETA selected
                max={
                  containerDetails.arrival_date
                    ? dayBefore(containerDetails.arrival_date)
                    : undefined
                }
              />
              {errors.departure_date && (
                <div className="invalid-feedback">{errors.departure_date}</div>
              )}
            </div>

            {/* ETA */}
            <div className="form-group mb-3">
              <label htmlFor="arrival_date" className="fw-bold">
                ETA (Estimated Time of Arrival)*
              </label>
              <input
                type="date"
                className={`form-control ${errors.arrival_date ? "is-invalid" : ""}`}
                id="arrival_date"
                name="arrival_date"
                value={containerDetails.arrival_date}
                onChange={handleChange}
                // Must be strictly after ETD if ETD selected
                min={
                  containerDetails.departure_date
                    ? dayAfter(containerDetails.departure_date)
                    : undefined
                }
              />
              {errors.arrival_date && (
                <div className="invalid-feedback">{errors.arrival_date}</div>
              )}
            </div>

            {/* Ship Name */}
            <div className="form-group mb-3">
              <label htmlFor="shipName" className="fw-bold">
                Ship Name*
              </label>
              <input
                type="text"
                className={`form-control ${errors.ship_name ? "is-invalid" : ""}`}
                id="shipName"
                name="ship_name"
                placeholder="Enter ship name"
                value={containerDetails.ship_name}
                onChange={handleChange}
              />
              {errors.ship_name && (
                <div className="invalid-feedback">{errors.ship_name}</div>
              )}
            </div>

            {/* Voyage */}
            <div className="form-group mb-3">
              <label htmlFor="ship_voyage" className="fw-bold">
                Voyage*
              </label>
              <input
                type="text"
                className={`form-control ${errors.ship_voyage ? "is-invalid" : ""}`}
                id="ship_voyage"
                name="ship_voyage"
                placeholder="Enter voyage"
                value={containerDetails.ship_voyage}
                onChange={handleChange}
              />
              {errors.ship_voyage && (
                <div className="invalid-feedback">{errors.ship_voyage}</div>
              )}
            </div>

            {/* BL Number */}
            <div className="form-group mb-3">
              <label htmlFor="BL_number" className="fw-bold">
                Bill of Lading (B/L) Number*
              </label>
              <input
                type="text"
                className={`form-control ${errors.BL_number ? "is-invalid" : ""}`}
                id="BL_number"
                name="BL_number"
                placeholder="Enter B/L number"
                value={containerDetails.BL_number}
                onChange={handleChange}
              />
              {errors.BL_number && (
                <div className="invalid-feedback">{errors.BL_number}</div>
              )}
            </div>

            {/* Consignee */}
            <div className="form-group mb-3">
              <label htmlFor="consignee" className="fw-bold">
                Consignee*
              </label>
              <select
                className={`form-control ${errors.consignee ? "is-invalid" : ""}`}
                id="consignee"
                name="consignee"
                value={containerDetails.consignee}
                onChange={handleChange}
              >
                <option value="">Select consignee</option>
                <option value="EurolImport Handels GmbH">EurolImport Handels GmbH</option>
                <option value="Global Freight Ltd.">Global Freight Ltd.</option>
                <option value="PortaTrade International">PortaTrade International</option>
                <option value="Maritime Hub AG">Maritime Hub AG</option>
                <option value="Continental Cargo Co.">Continental Cargo Co.</option>
                <option value="Oceanic Supplies Ltd.">Oceanic Supplies Ltd.</option>
                <option value="HarborLink Logistics">HarborLink Logistics</option>
                <option value="North Sea Importers">North Sea Importers</option>
                <option value="Asia-Europe Traders">Asia-Europe Traders</option>
                <option value="BalticBridge GmbH">BalticBridge GmbH</option>
              </select>
              {errors.consignee && (
                <div className="invalid-feedback">{errors.consignee}</div>
              )}
            </div>

            {/* Shipper */}
            <div className="form-group mb-3">
              <label htmlFor="shipper" className="fw-bold">
                Shipper*
              </label>
              <select
                className={`form-control ${errors.shipper ? "is-invalid" : ""}`}
                id="shipper"
                name="shipper"
                value={containerDetails.shipper}
                onChange={handleChange}
              >
                <option value="">Select shipper</option>
                <option value="Pacific Ocean Export Ltd.">Pacific Ocean Export Ltd.</option>
                <option value="TransMarine Co.">TransMarine Co.</option>
                <option value="Asian Freight Movers">Asian Freight Movers</option>
                <option value="Seaway Logistics">Seaway Logistics</option>
                <option value="Mediterranean Shipping Company">Mediterranean Shipping Company</option>
                <option value="EastWest Traders">EastWest Traders</option>
                <option value="OceanTrade Global">OceanTrade Global</option>
                <option value="SeaPort Shippers">SeaPort Shippers</option>
                <option value="Mediterranean Freight Co.">Mediterranean Freight Co.</option>
                <option value="Atlantic Export Hub">Atlantic Export Hub</option>
                <option value="FreightMasters Intl.">FreightMasters Intl.</option>
              </select>
              {errors.shipper && (
                <div className="invalid-feedback">{errors.shipper}</div>
              )}
            </div>

            {/* Origin */}
            <div className="form-group mb-3">
              <label htmlFor="origin_port" className="fw-bold">
                Port of Origin*
              </label>
              <select
                className={`form-control ${errors.origin_port ? "is-invalid" : ""}`}
                id="origin_port"
                name="origin_port"
                value={containerDetails.origin_port}
                onChange={handleChange}
              >
                <option value="">Select origin port</option>
                <option value="Shanghai">Shanghai</option>
                <option value="Singapore">Singapore</option>
                <option value="Rotterdam">Rotterdam</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Busan">Busan</option>
                <option value="Antwerp">Antwerp</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Dubai">Dubai</option>
                <option value="Port Klang">Port Klang</option>
                <option value="Tokyo">Tokyo</option>
              </select>
              {errors.origin_port && (
                <div className="invalid-feedback">{errors.origin_port}</div>
              )}
            </div>

            {/* Destination */}
            <div className="form-group mb-4">
              <label htmlFor="destination_port" className="fw-bold">
                Port of Destination*
              </label>
              <select
                className={`form-control ${errors.destination_port ? "is-invalid" : ""}`}
                id="destination_port"
                name="destination_port"
                value={containerDetails.destination_port}
                onChange={handleChange}
              >
                <option value="">Select destination port</option>
                <option value="Rotterdam">Rotterdam</option>
                <option value="Antwerp">Antwerp</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Koper">Koper</option>
                <option value="Valencia">Valencia</option>
                <option value="Gioia Tauro">Gioia Tauro</option>
                <option value="Felixstowe">Felixstowe</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Piraeus">Piraeus</option>
                <option value="Le Havre">Le Havre</option>
                <option value="Marseille">Marseille</option>
              </select>
              {errors.destination_port && (
                <div className="invalid-feedback">{errors.destination_port}</div>
              )}
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddContainer;
