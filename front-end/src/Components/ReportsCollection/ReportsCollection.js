// src/Components/Report/ReportsCollection.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Configuration";
import { useNavigate } from "react-router-dom";

const ReportsCollection = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    reporter_email: "",
    subject: "",
    category: "",
    priority: "",
    status: "", // if you have it; otherwise remove
  });

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchReports = async () => {
    const user_id = localStorage.getItem("user_id");
    const role = (localStorage.getItem("role") || "").toLowerCase();

    console.log("[ReportsCollection] user_id:", user_id, "role:", role);

    if (!user_id || !role) {
      Swal.fire("Error", "You must be logged in.", "error");
      return;
    }

    const toList = (data) =>
      Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];

    try {
      setLoading(true);

      // 1) primary endpoint
      const primaryUrl =
        role === "admin"
          ? `${API_URL}/api/reports`
          : `${API_URL}/api/reports/user/${user_id}`;

      let res = await axios.get(primaryUrl);
      console.log("[ReportsCollection] primary GET", primaryUrl, "→", res.data);
      let list = toList(res.data);

      // 2) fallback for users if nothing came back (common if user_id is NULL/mismatched)
      let usedFallback = false;
      if (list.length === 0 && role !== "admin") {
        try {
          const fallback = await axios.get(`${API_URL}/api/reports`);
          console.log(
            "[ReportsCollection] fallback GET /api/reports →",
            fallback.data
          );
          const all = toList(fallback.data);
          if (all.length > 0) {
            list = all;
            usedFallback = true;
          }
        } catch {
          /* ignore */
        }
      }

      console.log("[ReportsCollection] final list length:", list.length);
      setReports(list);

      if (usedFallback) {
        Swal.fire({
          toast: true,
          position: "top-end",
          timer: 2200,
          showConfirmButton: false,
          icon: "info",
          title: "Showing all reports (no user-linked reports yet).",
        });
      }
    } catch (err) {
      console.error(
        "Error fetching reports:",
        err.response?.status,
        err.response?.data || err
      );
      Swal.fire("Error", "Could not load reports.", "error");
      setReports([]); // keep it an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshClick = () => {
    setFilters({
      reporter_email: "",
      subject: "",
      category: "",
      priority: "",
      status: "",
    });
    fetchReports();
  };

  // ✅ guard against non-arrays so .filter never crashes
  const filtered = useMemo(() => {
    const list = Array.isArray(reports) ? reports : [];
    return list.filter((r) => {
      const email = (r.reporter_email || "").toLowerCase();
      const subj = (r.subject || "").toLowerCase();
      const cat = (r.category || "").toLowerCase();
      const pri = (r.priority || "").toLowerCase();
      const stat = (r.status || "").toLowerCase();

      const fEmail = filters.reporter_email.toLowerCase();
      const fSubj = filters.subject.toLowerCase();
      const fCat = filters.category.toLowerCase();
      const fPri = filters.priority.toLowerCase();
      const fStat = filters.status.toLowerCase();

      return (
        email.includes(fEmail) &&
        subj.includes(fSubj) &&
        (fCat ? cat === fCat : true) &&
        (fPri ? pri === fPri : true) &&
        (fStat ? stat === fStat : true)
      );
    });
  }, [reports, filters]);

  return (
    <div className="container mt-4">
      {/* Filters */}
      <div className="bg-light p-4 rounded-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name="reporter_email"
              value={filters.reporter_email}
              onChange={handleInputChange}
              placeholder="user@example.com"
            />
          </div>

          <div className="col-md-3">
            <label>Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={filters.subject}
              onChange={handleInputChange}
              placeholder="Search subject"
            />
          </div>

          <div className="col-md-2">
            <label>Category</label>
            <select
              className="form-select"
              name="category"
              value={filters.category}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="wrong_data">Wrong data</option>
              <option value="technical">Technical</option>
              <option value="feature">Feature</option>
              <option value="billing">Billing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-md-2">
            <label>Priority</label>
            <select
              className="form-select"
              name="priority"
              value={filters.priority}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="col-md-2">
            <label>Status</label>
            <select
              className="form-select"
              name="status"
              value={filters.status}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12 text-end">
            <button
              className="btn btn-primary"
              onClick={handleRefreshClick}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {!loading && filtered.length === 0 ? (
        <p className="text-center">No reports found.</p>
      ) : (
        <div className="row">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="col-md-4 mb-4"
              onClick={() => navigate(`/report/${r.id}`)} // create this page later if you want
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm p-3">
                <h5 className="card-title mb-2 text-truncate">
                  <strong>Subject:</strong> {r.subject}
                </h5>
                <p className="mb-1">
                  <strong>Email:</strong> {r.reporter_email}
                </p>
                <p className="mb-1 text-capitalize">
                  <strong>Category:</strong> {r.category}
                </p>
                <p className="mb-1 text-capitalize">
                  <strong>Priority:</strong> {r.priority}
                </p>
                {"status" in r && (
                  <p className="mb-1 text-capitalize">
                    <strong>Status:</strong> {r.status}
                  </p>
                )}
                <p className="mb-0 text-muted">
                  {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsCollection;
