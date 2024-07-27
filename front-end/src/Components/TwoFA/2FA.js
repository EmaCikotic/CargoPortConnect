import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TwoFAPic from "./2FA.jpg";

const TwoFA = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const isValid = () => {
    if (code.length === 6) {
      // Add condition to check if the code matches the sent code
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter the correct code ",
        allowOutsideClick: false,
      });
    }
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid();
  };

  //https://getbootstrap.com/docs/4.1/content/images/

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="rounded shadow p-4  col-4 text-center">
        <img
          src={TwoFAPic}
          className="img-fluid mb-4"
          alt="Two Factor Authentication"
        />
        <h2 className="mb-3">Two Factor Authentication</h2>
        <div className="mb-4">
          Enter the 6-digit code which was sent to your email:
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter code here"
            value={code}
            onChange={handleChange}
            className="form-control mb-3 rounded border border-primary shadow-sm "
          />
          <button
            type="submit"
            className="btn btn-primary fw-bold w-100"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,121,1) 0%, rgba(0,212,255,1) 100%)",
              border: "none",
            }}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFA;
