import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import { API_URL } from "../../Configuration";
import Swal from "sweetalert2";

const ContainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [container, setContainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContainer = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/containers/container/${id}`
        );
        setContainer(res.data);
      } catch (err) {
        console.error("Error fetching container:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContainer();
  }, [id]);

  const handleDownload = () => {
    if (!container) return;

    const doc = new jsPDF();
    const lineHeight = 9;
    let y = 20;

    const userEmail = localStorage.getItem("user_email") || "Not provided";
    const currentDateTime = new Date().toLocaleString();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("CargoPortConnect", 20, y);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text(`Contact: contact@cargoportconnect.com | +123 456 789`, 20, y);
    y += 5;
    doc.text(`Generated on: ${currentDateTime}`, 20, y);
    y += 10;
    doc.line(20, y, 190, y);
    y += 10;

    const addSectionTitle = (title) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(title, 20, y);
      y += 7;
    };

    const addLine = (label, value) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`${label}: ${value || "N/A"}`, 25, y);
      y += lineHeight;
    };

    const addSeparator = () => {
      y += 2;
      doc.setDrawColor(230);
      doc.line(20, y, 190, y);
      y += 6;
    };

    addSectionTitle("General Info");
    addLine("Container Number", container.container_number);

    addLine("Status", container.status);
    addLine("Created At", new Date(container.date_created).toLocaleString());
    addSeparator();

    addSectionTitle("Shipping Info");

    addLine("Origin", container.origin_port);
    addLine("Destination", container.destination_port);
    addSeparator();

    addSectionTitle("Voyage Info");
    addLine("Ship Name", container.ship_name);
    addLine("Voyage", container.ship_voyage);
    addLine("ETD", new Date(container.departure_date).toLocaleDateString());
    addLine("ETA", new Date(container.arrival_date).toLocaleDateString());
    addSeparator();

    addSectionTitle("Documentation");
    addLine("B/L Number", container.BL_number);

    addSeparator();

    y += 20;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.text("Authorized by:", 140, y);
    y += 8;
    doc.setFont("helvetica", "bolditalic");
    doc.text("John D. Signer", 140, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    doc.text("Logistics Supervisor", 140, y);

    y = 280;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("© 2025 CargoPortConnect | www.cargoportconnect.com", 105, y, {
      align: "center",
    });

    doc.save(`${container.container_number}_details.pdf`);
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This container will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/containers/${id}`);
        await Swal.fire("Deleted!", "Container has been removed.", "success");
        navigate("/collection");
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete container.", "error");
      }
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!container)
    return <p className="text-center mt-5">Container not found</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <h2 className="text-center mb-4">Container Details</h2>
      <div className="p-4 rounded bg-light shadow-sm">
        <h5
          className="py-2 px-3 mt-3 mb-3 rounded"
          style={{
            backgroundColor: "#f1f3f5",
            fontWeight: "700",
            fontSize: "1.2rem",
          }}
        >
          General Info
        </h5>
        <div className="ms-4">
          <p>
            <strong>Container Number:</strong> {container.container_number}
          </p>

          <p>
            <strong>Status:</strong> {container.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(container.date_created).toLocaleString()}
          </p>
        </div>

        <h5
          className="py-2 px-3 mt-3 mb-3 rounded"
          style={{
            backgroundColor: "#f1f3f5",
            fontWeight: "700",
            fontSize: "1.2rem",
          }}
        >
          Shipping Info
        </h5>
        <div className="ms-4">
          <p>
            <strong>Origin:</strong> {container.origin_port}
          </p>
          <p>
            <strong>Destination:</strong> {container.destination_port}
          </p>
        </div>

        <h5
          className="py-2 px-3 mt-3 mb-3 rounded"
          style={{
            backgroundColor: "#f1f3f5",
            fontWeight: "700",
            fontSize: "1.2rem",
          }}
        >
          Voyage Info
        </h5>
        <div className="ms-4">
          <p>
            <strong>Ship Name:</strong> {container.ship_name}
          </p>
          <p>
            <strong>Voyage:</strong> {container.ship_voyage}
          </p>
          <p>
            <strong>ETD:</strong>{" "}
            {new Date(container.departure_date).toLocaleDateString()}
          </p>
          <p>
            <strong>ETA:</strong>{" "}
            {new Date(container.arrival_date).toLocaleDateString()}
          </p>
        </div>

        <h5
          className="py-2 px-3 mt-3 mb-3 rounded"
          style={{
            backgroundColor: "#f1f3f5",
            fontWeight: "700",
            fontSize: "1.2rem",
          }}
        >
          Documentation
        </h5>
        <div className="ms-4">
          <p>
            <strong>B/L Number:</strong> {container.BL_number}
          </p>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-primary" onClick={handleDownload}>
            Download as PDF
          </button>
        </div>

        <div className="d-flex justify-content-end mt-2">
          <button
            className="btn btn-outline-primary me-3"
            onClick={() => navigate(`/container/${id}/edit`)}
          >
            Edit
          </button>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="text-center my-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/collection")}
        >
          Back to Collection
        </button>
      </div>
    </div>
  );
};

export default ContainerDetails;
