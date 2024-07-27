import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
{
  /**TODO
   * tukaj naj bodo services vse od da se sprejema kontejnerja kolko casa so lahko
   *  kasne so sankcije, meaning naredi pdg za cenik kolko se racuna za zamude into
   * pol da smo na voljo za vprasanje into
   */
}
const Services = () => {
  const sectionStyle = {
    backgroundColor: "#f5f5f5",
    padding: "2rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
  };

  const headingStyle = {
    color: "#003366",
    fontWeight: "bold",
  };

  const linkStyle = {
    color: "#008080", // Teal
    fontWeight: "bold",
  };

  const challengeSectionStyle = {
    backgroundColor: "#e6f7ff",
    padding: "2rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 mb-4">
          <h2 style={headingStyle} className="mb-3">
            Our Services
          </h2>
          <p>
            At <strong>Cargo Port Connect</strong>, we specialize in optimizing
            container management and logistics solutions tailored to your
            business needs. Our services are designed to enhance efficiency and
            reliability in the global shipping and logistics industry.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={challengeSectionStyle}>
          <h2 style={{ ...headingStyle, color: "#ff6600" }} className="mb-3">
            Performance
          </h2>
          <p>
            Our systems are built for <strong>responsive performance</strong>,
            ensuring quick data retrieval and reporting. This enables real-time
            tracking and monitoring of shipments, enhancing operational
            efficiency.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={sectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Security
          </h2>
          <p>
            We prioritize <strong>data security</strong> with robust measures to
            protect sensitive information. Access is restricted to authorized
            personnel, ensuring your data remains confidential.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={sectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Data Integrity
          </h2>
          <p>
            Our system guarantees <strong>accuracy</strong> in container
            information and financial transactions, providing reliable data that
            you can trust for your logistics operations.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={challengeSectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Scalability
          </h2>
          <p>
            Designed to accommodate a growing number of containers and users,
            our system ensures that your logistics operations remain smooth and
            efficient as your business expands.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={sectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Reliability
          </h2>
          <p>
            With an uptime of at least <strong>95%</strong>, our systems
            guarantee high reliability, ensuring minimal downtime and data loss.
            You can depend on us for 24/7 operation.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={sectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Notification System
          </h2>
          <p>
            Our dependable notification system, including timely email alerts,
            ensures that you are always informed about the status of your
            shipments and important updates.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={challengeSectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            System Packaging and Installation
          </h2>
          <p>
            Our system is packaged as a web application for ease of use.
            Installation and configuration are streamlined with install scripts,
            and we provide comprehensive documentation to assist users.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={sectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Have Questions?
          </h2>
          <p>
            If you have any questions or need further assistance, our team is
            here to help. Please do not hesitate to reach out to us at{" "}
            <a href="mailto:contact@cargoportconnect.com" style={linkStyle}>
              contact@cargoportconnect.com
            </a>{" "}
            for more information about our services and how we can support your
            logistics needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
