import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Configuration";

const EditContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/containers/container/${id}`
        );
        setForm(res.data);
      } catch (err) {
        Swal.fire("Error", "Could not fetch container data.", "error");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/containers/container/${id}`, form);
      Swal.fire("Success", "Container updated successfully!", "success");
      navigate(`/container/${id}`);
    } catch (err) {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h3 className="text-center mb-4">Edit Container</h3>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label text-capitalize">
              {key.replace(/_/g, " ")}
            </label>
            <input
              type={key.includes("date") ? "date" : "text"}
              className="form-control"
              name={key}
              value={value || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/container/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContainer;
