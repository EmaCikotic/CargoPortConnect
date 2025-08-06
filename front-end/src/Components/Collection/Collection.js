import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Configuration";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    container: "",
    BL_number: "",
    ship_name: "",
    ship_voyage: "",
  });

  const [userContainers, setUserContainers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterContainers = () => {
    return userContainers.filter((c) => {
      const matchesContainer = (c.container_number || "")
        .toLowerCase()
        .includes(filters.container.toLowerCase());

      const matchesBL = (c.BL_number || "")
        .toLowerCase()
        .includes(filters.BL_number.toLowerCase());

      const matchesShipName = (c.ship_name || "")
        .toLowerCase()
        .includes(filters.ship_name.toLowerCase());

      const matchesShipVoyage = (c.ship_voyage || "")
        .toLowerCase()
        .includes(filters.ship_voyage.toLowerCase());

      return (
        matchesContainer && matchesBL && matchesShipName && matchesShipVoyage
      );
    });
  };

  const fetchUserContainers = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      Swal.fire("Error", "You must be logged in.", "error");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/containers/user/${user_id}`
      );
      setUserContainers(response.data);
    } catch (error) {
      console.error("Error fetching containers:", error);
      Swal.fire("Error", "Could not load containers.", "error");
    }
  };

  useEffect(() => {
    fetchUserContainers();
  }, []);

  const handleRefreshClick = () => {
    setFilters({
      container: "",
      BL_number: "",
      ship_name: "",
      ship_voyage: "",
    });
    fetchUserContainers();
  };

  const filtered = filterContainers();

  return (
    <div className="container mt-4">
      {/* Filters */}
      <div className="bg-light p-4 rounded-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label>Container #</label>
            <input
              type="text"
              className="form-control"
              name="container"
              value={filters.container}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3">
            <label>B/L #</label>
            <input
              type="text"
              className="form-control"
              name="BL_number"
              value={filters.BL_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <label>Ship Name</label>
            <input
              type="text"
              className="form-control"
              name="ship_name"
              value={filters.ship_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3">
            <label>Ship Voyage</label>
            <input
              type="text"
              className="form-control"
              name="ship_voyage"
              value={filters.ship_voyage}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12 text-end">
            <button className="btn btn-primary" onClick={handleRefreshClick}>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-center">No containers found.</p>
      ) : (
        <div className="row">
          {filtered.map((item, index) => (
            <div
              key={index}
              className="col-md-4 mb-4"
              onClick={() => navigate(`/container/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm p-3">
                <h5 className="card-title text-uppercase mb-3">
                  <strong>Container:</strong> {item.container_number}
                </h5>
                <p className="mb-1">
                  <strong>BL:</strong> {item.BL_number}
                </p>
                <p className="mb-1">
                  <strong>Ship:</strong> {item.ship_name}
                </p>
                <p className="mb-1">
                  <strong>Voyage:</strong> {item.ship_voyage}
                </p>
                <p className="mb-1">
                  <strong>Route:</strong> {item.origin_port} →{" "}
                  {item.destination_port}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
