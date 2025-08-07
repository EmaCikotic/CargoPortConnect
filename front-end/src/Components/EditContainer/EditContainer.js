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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/containers/container/${id}`
        );
        setForm({
          container_number: res.data.container_number,
          arrival_date: res.data.arrival_date?.split("T")[0],
          departure_date: res.data.departure_date?.split("T")[0],
          ship_name: res.data.ship_name,
          ship_voyage: res.data.ship_voyage,
          BL_number: res.data.BL_number,
          status: res.data.status,
          consignee: res.data.consignee,
          shipper: res.data.shipper,
          origin_port: res.data.origin_port,
          destination_port: res.data.destination_port,
        });
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

    const cleanedForm = {
      ...form,
      arrival_date: form.arrival_date?.split("T")[0],
      departure_date: form.departure_date?.split("T")[0],
    };

    try {
      await axios.put(`${API_URL}/api/containers/container/${id}`, cleanedForm);
      Swal.fire("Success", "Container updated successfully!", "success");
      navigate(`/container/${id}`);
    } catch (err) {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  return (
    <div
      className="container mt-5 bg-light rounded p-4 mb-5"
      style={{ maxWidth: "700px" }}
    >
      <h2 className="text-center mb-4">Edit Container</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <strong>
              <label className="form-label text-capitalize">
                {key.replace(/_/g, " ")}
              </label>
            </strong>
            <input
              type={key.includes("date") ? "date" : "text"}
              className="form-control"
              name={key}
              value={value || ""}
              onChange={handleChange}
              disabled={key === "status" || key === "BL_number"} 
            />
          </div>
        ))}

        <div className="d-flex justify-content-between mb-2">
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
