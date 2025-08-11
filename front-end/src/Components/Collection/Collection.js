import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Configuration";
import { useNavigate } from "react-router-dom";

const STATUSES = ["expected", "departed", "in_port"];

const Collection = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [filters, setFilters] = useState({
    container: "",
    BL_number: "",
    ship_name: "",
    ship_voyage: "",
  });

  const [userContainers, setUserContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal state for warning/penalty
  const [modal, setModal] = useState({
    open: false,
    container: null,
    type: "warning", // 'warning' | 'penalty'
    reason: "",
    amount: "0.00",
    submitting: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserContainers = async () => {
    const user_id = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    if (!user_id || !role) {
      Swal.fire("Error", "You must be logged in.", "error");
      return;
    }

    try {
      setLoading(true);
      const response =
        role === "admin"
          ? await axios.get(`${API_URL}/api/containers`) // admin sees all
          : await axios.get(`${API_URL}/api/containers/user/${user_id}`); // user sees only theirs

      setUserContainers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching containers:", error);
      Swal.fire("Error", "Could not load containers.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserContainers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const filtered = useMemo(() => {
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
  }, [userContainers, filters]);

  // --- Admin helpers ---

  const todayStr = new Date().toISOString().slice(0, 10);
  const isDepartureOverdue = (c) =>
    c.status === "expected" && c.departure_date && c.departure_date < todayStr;

  const isArrivalOverdue = (c) =>
    (c.status === "departed" || c.status === "in_transit") &&
    c.arrival_date &&
    c.arrival_date < todayStr;

  const handleStatusChange = async (e, container) => {
    e.stopPropagation();
    const newStatus = e.target.value;

    try {
      await axios.patch(`${API_URL}/api/containers/${container.id}/status`, {
        status: newStatus,
      });

      // update locally to keep UI snappy
      setUserContainers((prev) =>
        prev.map((c) =>
          c.id === container.id ? { ...c, status: newStatus } : c
        )
      );

      Swal.fire("Updated", `Status set to "${newStatus}".`, "success");
    } catch (err) {
      console.error("status update error:", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to update status.",
        "error"
      );
    }
  };

  const openWarn = (e, container) => {
    e.stopPropagation();
    setModal({
      open: true,
      container,
      type: "warning",
      reason: "",
      amount: "0.00",
      submitting: false,
    });
  };

  const openPenalty = (e, container) => {
    e.stopPropagation();
    setModal({
      open: true,
      container,
      type: "penalty",
      reason: "",
      amount: "0.00",
      submitting: false,
    });
  };

  const closeModal = () =>
    setModal((m) => ({
      ...m,
      open: false,
      container: null,
      reason: "",
      amount: "0.00",
    }));

  const submitPenaltyForm = async (e) => {
    e.preventDefault();
    if (!modal.reason.trim()) {
      Swal.fire("Missing reason", "Please describe the reason.", "warning");
      return;
    }
    if (
      modal.type === "penalty" &&
      (modal.amount === "" || isNaN(+modal.amount))
    ) {
      Swal.fire(
        "Invalid amount",
        "Enter a valid amount for a penalty.",
        "warning"
      );
      return;
    }

    try {
      setModal((m) => ({ ...m, submitting: true }));
      await axios.post(`${API_URL}/api/penalties`, {
        container_id: modal.container?.id ?? null,
        type: modal.type,
        reason: modal.reason.trim(),
        amount: Number(modal.amount || 0),
      });

      Swal.fire(
        modal.type === "warning" ? "Warning created" : "Penalty created",
        "Record has been saved.",
        "success"
      );
      closeModal();
    } catch (err) {
      console.error("create penalty:", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to create record.",
        "error"
      );
    } finally {
      setModal((m) => ({ ...m, submitting: false }));
    }
  };

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
            <button
              className="btn btn-primary"
              onClick={handleRefreshClick}
              disabled={loading}
            >
              {loading ? "Loading…" : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-center">No containers found.</p>
      ) : (
        <div className="row">
          {filtered.map((item) => {
            const departOver = isDepartureOverdue(item);
            const arriveOver = isArrivalOverdue(item);

            return (
              <div
                key={item.id}
                className="col-md-4 mb-4"
                onClick={() => navigate(`/container/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card shadow-sm p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title text-uppercase mb-2">
                      <strong>Container:</strong> {item.container_number}
                    </h5>

                    {/* Status pill (view) */}
                    <span className="badge bg-secondary text-capitalize">
                      {item.status || "expected"}
                    </span>
                  </div>

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

                  <div className="mt-2 small">
                    <div>
                      <strong>ETD:</strong> {item.departure_date || "-"}{" "}
                      {departOver && (
                        <span className="badge bg-warning text-dark ms-2">
                          Missed ETD
                        </span>
                      )}
                    </div>
                    <div>
                      <strong>ETA:</strong> {item.arrival_date || "-"}{" "}
                      {arriveOver && (
                        <span className="badge bg-danger ms-2">Missed ETA</span>
                      )}
                    </div>
                  </div>

                  {role === "admin" && (
                    <>
                      <hr />
                      <div className="d-flex flex-wrap gap-2 align-items-center">
                        {/* Inline status change */}
                        <div
                          className="d-flex align-items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <label className="small text-muted mb-0">
                            Status
                          </label>
                          <select
                            className="form-select form-select-sm"
                            value={item.status || "expected"}
                            onChange={(e) => handleStatusChange(e, item)}
                          >
                            {STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div
                          className="ms-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={(e) => openWarn(e, item)}
                          >
                            Warn
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => openPenalty(e, item)}
                          >
                            Penalty
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Warning/Penalty Modal */}
      {modal.open && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,.35)" }}
          onClick={closeModal}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <form onSubmit={submitPenaltyForm}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modal.type === "warning"
                      ? "Create Warning"
                      : "Create Penalty"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  />
                </div>

                <div className="modal-body">
                  <div className="mb-2">
                    <div className="small text-muted">Container</div>
                    <div className="fw-semibold">
                      {modal.container?.container_number}{" "}
                      <span className="text-muted">#{modal.container?.id}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      value={modal.type}
                      onChange={(e) =>
                        setModal((m) => ({
                          ...m,
                          type: e.target.value,
                          // default amount to 0 for warning
                          amount:
                            e.target.value === "warning" ? "0.00" : m.amount,
                        }))
                      }
                    >
                      <option value="warning">Warning</option>
                      <option value="penalty">Penalty</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={modal.reason}
                      onChange={(e) =>
                        setModal((m) => ({ ...m, reason: e.target.value }))
                      }
                      placeholder="Describe why this is issued…"
                    />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Amount (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control"
                      value={modal.amount}
                      disabled={modal.type === "warning"}
                      onChange={(e) =>
                        setModal((m) => ({ ...m, amount: e.target.value }))
                      }
                    />
                    <small className="text-muted">
                      For warnings, amount stays at 0.00.
                    </small>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={closeModal}
                    disabled={modal.submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={modal.submitting}
                  >
                    {modal.submitting ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
