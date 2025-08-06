import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const AboutUs = () => {
  const sectionStyle = {
    backgroundColor: "#f5f5f5", // Light Gray Background
    padding: "2rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
  };

  const headingStyle = {
    color: "#003366", // Ocean Blue
    fontWeight: "bold",
  };

  const linkStyle = {
    color: "#008080", // Teal
    fontWeight: "bold",
  };

  const challengeSectionStyle = {
    backgroundColor: "#e6f7ff", // Light Sky Blue for Challenge section
    padding: "2rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 mb-4">
          <h2 style={headingStyle} className="mb-3">
            Our Story
          </h2>
          <p>
            At <strong>CargoPortConnect</strong>, our mission is to
            <strong> revolutionize container management</strong> for the global
            shipping and logistics industry. As a key player within the{" "}
            <a
              href="https://www.intereuropa.si/en/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <strong>Intereuropa Group</strong>
            </a>
            , we are dedicated to solving <strong>critical challenges</strong>{" "}
            and enhancing
            <strong> operational efficiency</strong> for shipping agencies
            worldwide.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={challengeSectionStyle}>
          <h2 style={{ ...headingStyle, color: "#ff6600" }} className="mb-3">
            The Challenge
          </h2>
          <p>
            Our journey began with a pressing issue identified by{" "}
            <a
              href="https://www.interagent.si/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <strong>Interagent Shipping Agency, Ltd. Co.</strong>
            </a>
            , a respected member of our group. They faced significant
            difficulties with the manual control of containers at the port of
            <strong> Koper</strong>. The traditional methods of examining
            containers were
            <strong> time-consuming</strong> and prone to{" "}
            <strong>errors</strong>, leading to increased lead times and{" "}
            <strong>customer dissatisfaction</strong>. A major challenge was the
            absence of an integrated{" "}
            <strong>graphical user interface (GUI)</strong> to track discharged
            containers and the lack of adequate documentation for containers
            remaining in port beyond <strong>three days</strong>. With each
            container linked to a
            <strong>
              {" "}
              <a
                style={linkStyle}
                href="https://www.maersk.com/logistics-explained/shipping-documentation/2023/10/02/what-is-bill-of-lading"
              >
                bill of lading{" "}
              </a>
              , container number, and seal
            </strong>
            , verifying authenticity and tracking movements was crucial yet
            cumbersome. This inefficiency affected not only{" "}
            <strong>customers</strong>, who faced delays and financial losses,
            but also{" "}
            <strong>
              transportation parties, consignees, and port operations
            </strong>
            . The result was a ripple effect of{" "}
            <strong>operational challenges</strong> and
            <strong> financial repercussions</strong> across the supply chain.
          </p>
        </div>

        <div className="col-md-12 mb-4" style={sectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Our Solution
          </h2>
          <p>
            In response to these challenges, <strong>CargoPortConnect</strong>{" "}
            developed a
            <strong> cutting-edge container management system</strong> designed
            to seamlessly integrate into existing workflows. Our solution
            enhances the
            <strong> tracking and documentation</strong> of containers,
            streamlining the process and significantly reducing{" "}
            <strong>errors</strong> and <strong>delays</strong>. By leveraging
            advanced technology, we provide a robust system that offers{" "}
            <strong>real-time visibility</strong>
            and <strong>accurate documentation</strong>. This transformation not
            only optimizes container management but also elevates overall{" "}
            <strong>operational efficiency</strong>.
          </p>
        </div>

        <div className="col-md-12" style={sectionStyle}>
          <h2 style={headingStyle} className="mb-3">
            Our Impact
          </h2>
          <p>
            Since the deployment of our solution,{" "}
            <strong>CargoPortConnect</strong> has made a
            <strong> significant impact</strong> on the global shipping
            industry. We are proud to have successfully served{" "}
            <strong>numerous clients around the world</strong>, demonstrating
            the <strong>effectiveness</strong> and <strong>reliability</strong>{" "}
            of our system in real-world scenarios. Our commitment to{" "}
            <strong>innovation and excellence</strong>
            has led to <strong>enhanced customer satisfaction</strong> and
            improved <strong>operational outcomes</strong> for our partners. At{" "}
            <strong>CargoPortConnect</strong>, we are dedicated to driving
            progress in <strong>container management</strong> and supporting the
            evolving needs of the logistics industry. Our story is one of{" "}
            <strong>continuous improvement</strong> and a relentless pursuit of
            solutions that make a<strong> tangible difference</strong> in the
            world of shipping and logistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
