import React, { useState } from "react";

const AddContainer = () => {
  const [containerDetails, setContainerDetails] = useState({
    containerNumber: "",
    containerType: "",
    cargoDescription: "",
    shippingLine: "",
    portOfOrigin: "",
    portOfDestination: "",
    shipName: "",
    voyage: "",
    ETD: "",
    ETA: "",
    blNumber: "",
    bookingNumber: "",
    hazardousMaterial: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox
    if (type === "checkbox") {
      setContainerDetails((prevState) => ({
        ...prevState,
        [name]: checked, // Update the checkbox state based on its checked status
      }));
    } else {
      setContainerDetails((prevState) => ({
        ...prevState,
        [name]: value, // Update the other form fields
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      setErrors({ form: "Please fill in the form correctly!" });
    } else {
      setErrors({});
      console.log("Container Details Submitted:", containerDetails);
    }
  };

  const isValidForm = () => {
    return (
      containerDetails.containerNumber !== "" &&
      containerDetails.containerType !== "" &&
      containerDetails.cargoDescription !== "" &&
      containerDetails.shippingLine !== "" &&
      containerDetails.portOfOrigin !== "" &&
      containerDetails.portOfDestination !== "" &&
      containerDetails.shipName !== "" &&
      containerDetails.voyage !== "" &&
      containerDetails.ETD !== "" &&
      containerDetails.ETA !== "" &&
      containerDetails.blNumber !== "" &&
      containerDetails.bookingNumber !== ""
    );
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
            {errors.form && (
              <div className="alert alert-danger" role="alert">
                {errors.form}
              </div>
            )}

            <div className="form-group mb-3">
              <label htmlFor="containerNumber" className="fw-bold">
                Container Number*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.containerNumber ? "is-invalid" : ""
                }`}
                id="containerNumber"
                name="containerNumber"
                placeholder="Enter container number"
                value={containerDetails.containerNumber}
                onChange={handleChange}
              />
              {errors.containerNumber && (
                <div className="invalid-feedback">{errors.containerNumber}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="containerType" className="fw-bold">
                Container Type*
              </label>
              <select
                className={`form-control ${
                  errors.containerType ? "is-invalid" : ""
                }`}
                id="containerType"
                name="containerType"
                value={containerDetails.containerType}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="20ft Standard">20ft Standard</option>
                <option value="40ft Standard">40ft Standard</option>
                <option value="Refrigerated">Refrigerated</option>
              </select>
              {errors.containerType && (
                <div className="invalid-feedback">{errors.containerType}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="cargoDescription" className="fw-bold">
                Cargo Description*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.cargoDescription ? "is-invalid" : ""
                }`}
                id="cargoDescription"
                name="cargoDescription"
                placeholder="Enter cargo description"
                value={containerDetails.cargoDescription}
                onChange={handleChange}
              />
              {errors.cargoDescription && (
                <div className="invalid-feedback">
                  {errors.cargoDescription}
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
                  errors.shippingLine ? "is-invalid" : ""
                }`}
                id="shippingLine"
                name="shippingLine"
                placeholder="Enter shipping line"
                value={containerDetails.shippingLine}
                onChange={handleChange}
              />
              {errors.shippingLine && (
                <div className="invalid-feedback">{errors.shippingLine}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="portOfOrigin" className="fw-bold">
                Port of Origin*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.portOfOrigin ? "is-invalid" : ""
                }`}
                id="portOfOrigin"
                name="portOfOrigin"
                placeholder="Enter port of origin"
                value={containerDetails.portOfOrigin}
                onChange={handleChange}
              />
              {errors.portOfOrigin && (
                <div className="invalid-feedback">{errors.portOfOrigin}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="portOfDestination" className="fw-bold">
                Port of Destination*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.portOfDestination ? "is-invalid" : ""
                }`}
                id="portOfDestination"
                name="portOfDestination"
                placeholder="Enter port of destination"
                value={containerDetails.portOfDestination}
                onChange={handleChange}
              />
              {errors.portOfDestination && (
                <div className="invalid-feedback">
                  {errors.portOfDestination}
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
                  errors.shipName ? "is-invalid" : ""
                }`}
                id="shipName"
                name="shipName"
                placeholder="Enter ship name"
                value={containerDetails.shipName}
                onChange={handleChange}
              />
              {errors.shipName && (
                <div className="invalid-feedback">{errors.shipName}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="voyage" className="fw-bold">
                Voyage*
              </label>
              <input
                type="text"
                className={`form-control ${errors.voyage ? "is-invalid" : ""}`}
                id="voyage"
                name="voyage"
                placeholder="Enter voyage"
                value={containerDetails.voyage}
                onChange={handleChange}
              />
              {errors.voyage && (
                <div className="invalid-feedback">{errors.voyage}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="ETD" className="fw-bold">
                ETD (Estimated Time of Departure)*
              </label>
              <input
                type="date"
                className={`form-control ${errors.ETD ? "is-invalid" : ""}`}
                id="ETD"
                name="ETD"
                value={containerDetails.ETD}
                onChange={handleChange}
              />
              {errors.ETD && (
                <div className="invalid-feedback">{errors.ETD}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="ETA" className="fw-bold">
                ETA (Estimated Time of Arrival)*
              </label>
              <input
                type="date"
                className={`form-control ${errors.ETA ? "is-invalid" : ""}`}
                id="ETA"
                name="ETA"
                value={containerDetails.ETA}
                onChange={handleChange}
              />
              {errors.ETA && (
                <div className="invalid-feedback">{errors.ETA}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="blNumber" className="fw-bold">
                Bill of Lading (B/L) Number*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.blNumber ? "is-invalid" : ""
                }`}
                id="blNumber"
                name="blNumber"
                placeholder="Enter B/L number"
                value={containerDetails.blNumber}
                onChange={handleChange}
              />
              {errors.blNumber && (
                <div className="invalid-feedback">{errors.blNumber}</div>
              )}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="bookingNumber" className="fw-bold">
                Booking Number*
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.bookingNumber ? "is-invalid" : ""
                }`}
                id="bookingNumber"
                name="bookingNumber"
                placeholder="Enter booking number"
                value={containerDetails.bookingNumber}
                onChange={handleChange}
              />
              {errors.bookingNumber && (
                <div className="invalid-feedback">{errors.bookingNumber}</div>
              )}
            </div>

            <div className="form-group mb-3 ">
              <label htmlFor="hazardousMaterial" className="fw-bold">
                Hazardous Material
              </label>
              <input
                className="mx-2"
                type="checkbox"
                id="hazardousMaterial"
                name="hazardousMaterial"
                checked={containerDetails.hazardousMaterial}
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
