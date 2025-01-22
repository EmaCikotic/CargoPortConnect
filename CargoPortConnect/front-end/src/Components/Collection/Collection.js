import React, { useState } from "react";

const Collection = () => {
  const [filters, setFilters] = useState({
    container: "",
    bl: "",
    booking: "",
    etd: "",
    eta: "",
  });

  // Hardcoded data to test the filter
  const [items, setItems] = useState([
    {
      container: "C123",
      bl: "BL001",
      booking: "B001",
      etd: "2025-01-15",
      eta: "2025-01-18",
    },
    {
      container: "C124",
      bl: "BL002",
      booking: "B002",
      etd: "2025-01-20",
      eta: "2025-01-22",
    },
    {
      container: "C125",
      bl: "BL003",
      booking: "B003",
      etd: "2025-01-22",
      eta: "2025-01-25",
    },
  ]);

  const [filteredItems, setFilteredItems] = useState(items);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterClick = () => {
    console.log("Filters applied:", filters);

    // Filter items based on the filter criteria
    const newFilteredItems = items.filter((item) => {
      return (
        (filters.container === "" ||
          item.container.includes(filters.container)) &&
        (filters.bl === "" || item.bl.includes(filters.bl)) &&
        (filters.booking === "" || item.booking.includes(filters.booking)) &&
        (filters.etd === "" || item.etd.includes(filters.etd)) &&
        (filters.eta === "" || item.eta.includes(filters.eta))
      );
    });

    // Update filtered items to be displayed
    setFilteredItems(newFilteredItems);
  };

  const handleRefreshClick = () => {
    // Reset filter
    setFilters({
      container: "",
      bl: "",
      booking: "",
      etd: "",
      eta: "",
    });

    // Reset filtered items to show all items
    setFilteredItems(items);
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
          <br></br>
          <div className="col-md-2">
            <label>ETD #</label>
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

      {/* Table outside the div */}
      <div className="container mt-4">
        <div className="col-12">
          {filteredItems.length === 0 ? (
            <p className="text-center">No results found</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Container #</th>
                  <th>B/L #</th>
                  <th>Booking #</th>
                  <th>ETD #</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.container}</td>
                    <td>{item.bl}</td>
                    <td>{item.booking}</td>
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
