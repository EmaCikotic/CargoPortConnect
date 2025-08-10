import React from "react";
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
import socialMedia from "./socialmedia.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <img src={background} alt="" className={styles.heroImg} />
        <div className={styles.overlay} />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.kicker}>CargoPortConnect</p>
          <h1 className={styles.title}>
            Streamlining shipping. Empowering efficiency.
          </h1>
          <p className={styles.lead}>
            We’re modernizing container management for the global shipping and
            logistics industry—clear status, fewer clicks, faster operations.
          </p>

          <div className={styles.ctaRow}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => navigate("/aboutus")}
            >
              Learn more
            </button>
            <a
              href="mailto:cargoportconnect@gmail.com"
              className={styles.btnSecondary}
            >
              Contact us
            </a>
          </div>
        </div>
        <div className={styles.fade} />
      </section>

      {/* VALUES */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Our Values</h2>

          <div className={styles.values}>
            <article className={styles.valueCard}>
              <div className={styles.valueIcon}>🧭</div>
              <h3>Integrity</h3>
              <p>We hold a high bar for ethics, clarity and accountability.</p>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueIcon}>⚙️</div>
              <h3>Innovation</h3>
              <p>We keep reducing friction with smart, practical solutions.</p>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Customer focus</h3>
              <p>We make decisions by asking: does this help our users?</p>
            </article>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What customers say</h2>

          <div className={styles.reviews}>
            <article className={`${styles.reviewCard} ${styles.r1}`}>
              <div className={styles.stars} aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <h5 className="mb-1">Eva Müller</h5>
              <small className={styles.dim}>
                Operations Manager, North Sea Importers
              </small>
              <p className="mt-3 mb-2">
                “We moved tracking from spreadsheets to CargoPortConnect.
                ETD/ETA updates and the PDF confirmations keep our sales and
                warehouse in sync. Zero ‘where is it?’ emails this quarter.”
              </p>
              <div className={styles.result}>
                ↗ 40% fewer status emails internally
              </div>
            </article>

            <article className={`${styles.reviewCard} ${styles.r2}`}>
              <div className={styles.stars} aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <h5 className="mb-1">Rahul Menon</h5>
              <small className={styles.dim}>
                Head of Logistics, Asia-Europe Traders
              </small>
              <p className="mt-3 mb-2">
                “Adding containers takes under a minute, and customers get
                automatic emails with a clean PDF. The report/complaint form
                with attachments cut our back-and-forth dramatically.”
              </p>
              <div className={styles.result}>↘ 35% fewer support tickets</div>
            </article>

            <article className={`${styles.reviewCard} ${styles.r3}`}>
              <div className={styles.stars} aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <h5 className="mb-1">Sofía Pérez</h5>
              <small className={styles.dim}>COO, HarborLink Logistics</small>
              <p className="mt-3 mb-2">
                “The team loves the clear timeline and the voyage/port fields.
                Updating a container triggers the right email—no missed calls,
                no surprises.”
              </p>
              <div className={styles.result}>
                ✔ On-time info to 100% of consignees
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>

          <div className={styles.team}>
            {[
              { img: CEO, name: "Alice Brown", role: "CEO" },
              { img: CTO, name: "Bob Carter", role: "CTO" },
              { img: COO, name: "Carol Davis", role: "COO" },
              {
                img: marketing,
                name: "David Evans",
                role: "Marketing Director",
              },
              { img: HR, name: "Eva Foster", role: "HR Manager" },
              { img: finance, name: "Frank Green", role: "Finance Director" },
              {
                img: socialMedia,
                name: "Grace Hall",
                role: "Social Media Manager",
              },
            ].map((m) => (
              <article key={m.name} className={styles.person}>
                <img src={m.img} alt={m.name} className={styles.teamImg} />
                <div className="mt-3">
                  <div className={styles.personName}>{m.name}</div>
                  <div className={styles.personRole}>{m.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          <p className={styles.sectionIntro}>
            We’re hiring people who love building polished, modern tools used by
            thousands of operators.
          </p>

          <div className={styles.notice}>
            Positions are available in Ljubljana and Koper as onsite, hybrid, or
            remote.
          </div>

          <div className={styles.jobs}>
            <button
              className={styles.job}
              onClick={() => navigate("/openPositions/backendEngineer")}
            >
              <div>
                <div className={styles.jobTitle}>Backend Engineer (PHP)</div>
                <div className={styles.jobNote}>Own backends and APIs</div>
              </div>
              <span className={styles.chev}>›</span>
            </button>

            <button
              className={styles.job}
              onClick={() => navigate("/openPositions/LogisticsCoordinator")}
            >
              <div>
                <div className={styles.jobTitle}>Logistics Coordinator</div>
                <div className={styles.jobNote}>
                  Manage shipper–client relationships
                </div>
              </div>
              <span className={styles.chev}>›</span>
            </button>

            <button
              className={styles.job}
              onClick={() => navigate("/openPositions/MarketingManager")}
            >
              <div>
                <div className={styles.jobTitle}>Marketing Manager</div>
                <div className={styles.jobNote}>Own marketing strategy</div>
              </div>
              <span className={styles.chev}>›</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
