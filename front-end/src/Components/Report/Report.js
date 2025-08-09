// src/Components/Report/Report.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../Configuration";

const MAX_FILES = 5;
const MAX_MB = 10;
const ACCEPT = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const Report = () => {
  const [form, setForm] = useState({
    reporter_name: "",
    reporter_email: "",
    category: "other",
    priority: "normal",
    subject: "",
    details: "",
  });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    const next = [...files];

    for (const f of selected) {
      if (!ACCEPT.includes(f.type)) {
        Swal.fire(
          "Unsupported file",
          `${f.name} has type ${f.type}`,
          "warning"
        );
        continue;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        Swal.fire(
          "File too large",
          `${f.name} exceeds ${MAX_MB} MB.`,
          "warning"
        );
        continue;
      }
      if (next.length >= MAX_FILES) {
        Swal.fire("Limit reached", `Max ${MAX_FILES} files allowed.`, "info");
        break;
      }
      next.push(f);
    }
    setFiles(next);
    e.target.value = ""; // allow re-selecting same file later
  };

  const removeFile = (idx) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const isValid = () => {
    if (
      !form.reporter_email?.trim() ||
      !form.subject?.trim() ||
      !form.details?.trim()
    ) {
      Swal.fire(
        "Missing info",
        "Email, Subject, and Details are required.",
        "error"
      );
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.reporter_email.trim()
    );
    if (!emailOk) {
      Swal.fire(
        "Invalid email",
        "Please enter a valid email address.",
        "error"
      );
      return false;
    }
    if (form.subject.trim().length < 3) {
      Swal.fire(
        "Subject too short",
        "Please add a more descriptive subject.",
        "error"
      );
      return false;
    }
    if (form.details.trim().length < 10) {
      Swal.fire(
        "Details too short",
        "Please describe the issue in more detail.",
        "error"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const user_id = localStorage.getItem("user_id") || null;

    // ✅ define FormData correctly
    const data = new FormData();

    // map frontend -> backend keys
    const payload = {
      reporter_name: form.reporter_name,
      reporter_email: form.reporter_email,
      category: form.category,
      priority: form.priority,
      subject: form.subject,
      details: form.details,
      user_id,
      has_attachment: files.length ? 1 : 0,
    };

    Object.entries(payload).forEach(([k, v]) => data.append(k, v ?? ""));
    files.forEach((f) => data.append("attachments", f, f.name));

    try {
      setSubmitting(true);
      // ✅ define `res` here; also DON'T set headers manually
      const res = await axios.post(`${API_URL}/api/reports`, data);

      if (res.status >= 200 && res.status < 300) {
        Swal.fire("Thanks!", "Your report has been sent.", "success");
        setForm({
          name: "",
          email: "",
          category: "other",
          priority: "normal",
          subject: "",
          details: "",
        });
        setFiles([]);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Could not send",
        err.response?.data?.message || "Please try again.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="p-4 p-md-5 bg-light rounded-4 shadow-sm">
            <h2 className="mb-2">Report / Complaint</h2>
            <p className="text-muted mb-4">
              Use this form to report incorrect container data, technical
              issues, or send a request. We’ll review and reply to the email you
              provide.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Your name</label>
                  <input
                    className="form-control"
                    name="reporter_name"
                    placeholder="John Doe (optional)"
                    value={form.reporter_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Your email*</label>
                  <input
                    type="email"
                    className="form-control"
                    name="reporter_email"
                    placeholder="you@example.com"
                    required
                    value={form.reporter_email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="wrong_data">Wrong container data</option>
                    <option value="technical">Technical issue</option>
                    <option value="feature">Feature request</option>
                    <option value="billing">Billing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Subject*</label>
                  <input
                    className="form-control"
                    name="subject"
                    placeholder="Short title"
                    required
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Describe the issue*</label>
                  <textarea
                    className="form-control"
                    name="details"
                    rows={6}
                    placeholder="What happened, steps to reproduce, expected vs actual..."
                    required
                    value={form.details}
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Please avoid sharing sensitive information.
                  </small>
                </div>

                <div className="col-12">
                  <label className="form-label">Attachments</label>
                  <input
                    type="file"
                    className="form-control"
                    accept={ACCEPT.join(",")}
                    multiple
                    onChange={handleFiles}
                  />
                  <small className="text-muted d-block mt-1">
                    Up to {MAX_FILES} files, {MAX_MB} MB each. Allowed: JPG,
                    PNG, WEBP, GIF, PDF.
                  </small>

                  {files.length > 0 && (
                    <ul className="list-group mt-2">
                      {files.map((f, i) => (
                        <li
                          key={`${f.name}-${i}`}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span className="text-truncate">
                            {f.name} ({(f.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFile(i)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="col-12 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>

            <hr className="my-4" />
            <small className="text-muted">
              Tip: you can also email us directly at{" "}
              <a href="mailto:cargoportconnect@gmail.com">
                cargoportconnect@gmail.com
              </a>
              .
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
