import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Home.module.css";
import background from "./background.jpg";
import CEO from "./CEO.jpg";
import CTO from "./CTO.jpg";
import COO from "./COO.jpg";
import marketing from "./marketing.jpg";
import HR from "./HR.jpg";
import finance from "./finance.jpg";
import socialMedia from "./socialmedia.jpg"; //

const Home = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className={`container-fluid ${styles.homePage}`}>
      <div className="row justify-content-center min-vh-100">
        <div
          className={` mb-4 ${
            showContent ? styles.fadeIn : ""
          } col-md-6 d-flex flex-column justify-content-center `}
        >
          <h1 className={`display-4 font-weight-bold text-center fw-bold`}>
            Welcome
          </h1>
          <p className={`lead mb-4 text-center`}>
            <strong>Streamlining Shipping, Empowering Efficiency.</strong>
          </p>
          <p className={`text-muted mb-4 `}>
            At CargoPortConnect, we are committed to revolutionizing container
            management and enhancing operational efficiency for the global
            shipping and logistics industry.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <a
              href="/aboutus"
              className={`btn btn-primary p-2 justify-content-center`}
            >
              Learn More
            </a>
            <a
              href="mailto:contact@cargoportconnect.com"
              className={`btn btn-secondary p-2 ${styles.contact}`}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <hr></hr>

      {/* Values Section 
      https://www.achievers.com/blog/company-core-value-examples/*/}
      <div className="row m-3  ">
        <div className="col-12 text-center">
          <h2 className="display-5 mb-4 fw-bold">Our Values</h2>
        </div>
        <div className="d-flex">
          <div className="col-md-4 text-center">
            <h3 className="text-danger fw-bold">Integrity</h3>
            <p className="text-muted">
              We uphold the highest standards of integrity in all our actions.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <h3 className="text-danger fw-bold">Innovation</h3>
            <p className="text-muted ">
              We innovate to provide better solutions for our clients.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <h3 className="text-danger fw-bold">Customer Focus</h3>
            <p className="text-muted">
              Our customers are at the center of everything we do.
            </p>
          </div>
        </div>
      </div>
      <hr></hr>

      {/**review section  reference https://www.trustpilot.com/review/airfreight.com
       * https://getbootstrap.com/docs/4.0/components/card/
       */}
      {/* Client Reviews Section */}
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-12 text-center">
          <h2 className="display-5 mb-4 fw-bold">Client Reviews</h2>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-secondary border-secondary">
            <div className="card-body">
              <h5 className="card-title fw-bold">John Doe</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                CEO, ExampleCorp
              </h6>

              <p className="card-text">
                "Excellent communication, easy payment process, prompt updates
                through the delivery process. I will not think twice about using
                them again. They made us look like heroes to our customer."
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className=" card text-white bg-success border-sucess">
            <div className="card-body">
              <h5 className="card-title fw-bold">Jane Smith</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Logistics Manager, ShipItFast
              </h6>
              <p className="card-text">
                "I wanted to take a moment to personally thank you and your team
                for the exceptional service provided in handling our recent
                order from Tampa to Visalia at such short notice. Your company
                exceeded our expectations by delivering the order ahead of
                schedule, which made a significant difference for us. Your
                dedication and professionalism are greatly appreciated, and we
                look forward to continuing our partnership with your company in
                the future. Thank you once again for your outstanding support."
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-info border-info">
            <div className="card-body">
              <h5 className="card-title fw-bold">Mike Johnson</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Operations Director, GlobalFreight
              </h6>
              <p className="card-text">
                "I wish I could give 100 Stars. I had an outstanding experience
                with Mr.Carol Davis and CargoPortConnect. I cannot remember the
                last time I was so impressed with such a swift and smooth
                transaction."
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>

      {/**TEAM */}
      {/* Team Section 
      pictures from
      https://www.freepik.com/
      https://unsplash.com/*/}
      <div className="row mt-5 justify-content-center">
        <div className="col-12 text-center">
          <h2 className="display-5 mb-4 fw-bold">Meet Our Team</h2>
        </div>
        <div className="col-md-4 mb-4 text-center">
          <img
            src={CEO}
            className={`img-fluid rounded-circle ${styles.teamImage}`}
            alt="CEO"
          />
          <blockquote className="blockquote mt-3">
            <p>
              "As the CEO, I lead our team with over 20 years of experience in
              the logistics industry."
            </p>
            <footer className="blockquote-footer">Alice Brown</footer>
          </blockquote>
        </div>
        <div className="d-flex">
          <div className="col-md-4 mb-4 text-center">
            <img
              src={CTO}
              className={`img-fluid rounded-circle ${styles.teamImage}`}
              alt="CTO"
            />
            <blockquote className="blockquote mt-3">
              <p>
                "As the CTO, I'm responsible for our technology strategy and
                implementation."
              </p>
              <footer className="blockquote-footer">Bob Carter</footer>
            </blockquote>
          </div>
          <div className="col-md-4 mb-4 text-center">
            <img
              src={COO}
              className={`img-fluid rounded-circle ${styles.teamImage}`}
              alt="COO"
            />
            <blockquote className="blockquote mt-3">
              <p>
                "As the COO, I oversee our daily operations to ensure everything
                runs smoothly."
              </p>
              <footer className="blockquote-footer">Carol Davis</footer>
            </blockquote>
          </div>
          <div className="col-md-4 mb-4 text-center">
            <img
              src={marketing}
              className={`img-fluid rounded-circle ${styles.teamImage}`}
              alt="Marketing Director"
            />
            <blockquote className="blockquote mt-3">
              <p>
                "As the Marketing Director, I handle all our marketing campaigns
                and brand strategy."
              </p>
              <footer className="blockquote-footer">David Evans</footer>
            </blockquote>
          </div>
        </div>
        <div className="d-flex">
          <div className="col-md-4 mb-4 text-center">
            <img
              src={HR}
              className={`img-fluid rounded-circle ${styles.teamImage}`}
              alt="HR Manager"
            />
            <blockquote className="blockquote mt-3">
              <p>
                "As the HR Manager, I ensure we attract and retain the best
                talent."
              </p>
              <footer className="blockquote-footer">Eva Foster</footer>
            </blockquote>
          </div>
          <div className="col-md-4 mb-4 text-center">
            <img
              src={finance}
              className={`img-fluid rounded-circle ${styles.teamImage}`}
              alt="Finance Director"
            />
            <blockquote className="blockquote mt-3">
              <p>
                "As the Finance Director, I oversee our financial planning and
                budgeting."
              </p>
              <footer className="blockquote-footer">Frank Green</footer>
            </blockquote>
          </div>
          <div className="col-md-4 mb-4 text-center">
            <img
              src={socialMedia}
              className={`img-fluid rounded-circle ${styles.teamImage}`}
              alt="Social Media Manager"
            />
            <blockquote className="blockquote mt-3">
              <p>
                "As the Social Media Manager, I create and manage content across
                our social platforms to engage our community."
              </p>
              <footer className="blockquote-footer">Grace Hall</footer>
            </blockquote>
          </div>
        </div>
      </div>
      <hr></hr>

      {/**open positions
       * for reference(design): https://dhimahi.com/jobs/#openPositions
       * https://getbootstrap.com/docs/4.0/components/list-group/
       */}
      <div className="container mt-5">
        <div className="text-center col-7 mx-auto">
          <h2 className="font-weight-bold ">Open Positions</h2>
          <p>
            We’re expanding our team, hiring people who are excited to build
            modern apps used by millions of users.
          </p>
        </div>

        <div className="alert alert-primary text-center col-7 mx-auto">
          Positions are available in Ljubljana and Koper as onsite, hybrid, or
          remote.
        </div>

        <div className="list-group cursor-pointer col-7 mx-auto">
          <div
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => navigate("/openPositions/backendEngineer")}
          >
            <div>
              <h5 className="mb-1">Backend Engineer (PHP)</h5>
              <small>Own backends and APIs</small>
            </div>
            <div>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => navigate("/openPositions/LogisticsCoordinator")}
          >
            <div>
              <h5 className="mb-1">Logistics Coordinator</h5>
              <small>Manage and coordinate logistic opeartions</small>
            </div>
            <div>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div
            className="list-group-item d-flex justify-content-between align-items-center "
            onClick={() => navigate("/openPositions/WarehouseManager")}
          >
            <div>
              <h5 className="mb-1">Warehouse Manager</h5>
              <small>Oversee warehouse operations and staff</small>
            </div>
            <div>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div
            className="list-group-item d-flex justify-content-between align-items-center "
            onClick={() => navigate("/openPositions/SupplyChainAnalyst")}
          >
            <div>
              <h5 className="mb-1">Supply Chain Analyst</h5>
              <small>Analyze and optimize supply chain processes</small>
            </div>
            <div>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
