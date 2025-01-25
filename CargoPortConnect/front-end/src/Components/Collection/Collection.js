import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Configuration";

const Collection = () => {
  const [filters, setFilters] = useState({
    container: "",
    bl: "",
    booking: "",
    etd: "",
    eta: "",
  });

  const [filteredContainers, setFilteredContainers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "You must be logged in.", "error");
        return;
      }

      const response = await axios.get(`${API_URL}/api/containers/filter`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });

      setFilteredContainers(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch containers.", "error");
    }
  };

  const handleRefreshClick = () => {
    setFilters({
      container: "",
      bl: "",
      booking: "",
      etd: "",
      eta: "",
    });
    setFilteredContainers([]); // Clear the list
  };

  return (
    <>
      <div className="container mt-4 bg-light p-4 rounded-3">
        <div className="row mb-3">
          <div className="col-md-2">
            <label>Container #</label>
            <input
              type="text"
              className="form-control"
              name="container"
              value={filters.container}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <label>B/L #</label>
            <input
              type="text"
              className="form-control"
              name="bl"
              value={filters.bl}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <label>Booking #</label>
            <input
              type="text"
              className="form-control"
              name="booking"
              value={filters.booking}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <label>ETD</label>
            <input
              type="date"
              className="form-control"
              name="etd"
              value={filters.etd}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <label>ETA</label>
            <input
              type="date"
              className="form-control"
              name="eta"
              value={filters.eta}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-primary w-50"
              onClick={handleFilterClick}
            >
              Filter
            </button>
            <button
              className="btn btn-secondary w-50 mx-2"
              onClick={handleRefreshClick}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="col-12">
          {filteredContainers.length === 0 ? (
            <p className="text-center">No results found</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Container #</th>
                  <th>B/L #</th>
                  <th>Booking #</th>
                  <th>ETD</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {filteredContainers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.container_number}</td>
                    <td>{item.bl_number}</td>
                    <td>{item.booking_number}</td>
                    <td>{item.etd}</td>
                    <td>{item.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;
