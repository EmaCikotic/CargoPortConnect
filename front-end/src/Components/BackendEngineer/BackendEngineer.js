import React from "react";
import styles from "./BackendEngineer.module.css";

const BackendEngineer = () => {
  return (
    <div className="bg-dark text-light">
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 text-center mb-4">
              Backend Engineer (PHP)
            </h1>
            <div className="p-4 mb-4">
              <h3 className="fw-bold">About the Role</h3>
              <p>
                We are looking for PHP Backend Engineers to work on innovative
                systems in the logistic industry.
              </p>

              <div className="d-flex flex-row gap-5 col-8 mx-auto">
                <div className="text-center">
                  <h4>Type</h4>
                  <p>Full-time</p>
                </div>
                <div className="text-center">
                  <h4>Experience</h4>
                  <p>Mid to Senior level</p>
                </div>
                <div className="text-center">
                  <h4>Location</h4>
                  <p>Ljubljana, Koper or remote</p>
                </div>
              </div>
              <br />
              <h2>What will you do</h2>
              <ul>
                <li className="text-secondary">
                  <strong className="text-white">
                    Build new backends from scratch
                  </strong>{" "}
                  — You'll work on new backends that will be used by frontends
                  and various other systems. You and the team will be
                  responsible for rolling out the features and enhancing them
                  even further.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Enhance existing APIs</strong>{" "}
                  — We have existing APIs that are due for new iteration. You
                  will review existing functionalities, come up with
                  improvements and ship them.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    Care about quality and improve performance
                  </strong>{" "}
                  — We care about quality and performance deeply. Business logic
                  you’ll develop will be covered with unit tests and the
                  products you’ll ship will serve in high-load environments.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Research and explore</strong> —
                  New technologies and development approaches are the reality of
                  our field. Continuous learning is developer’s essential
                  quality. We’ll make sure you have the ability and time to
                  focus on your growth as a developer.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Co-own the product</strong> —
                  You’ll be a part of a team where everybody has autonomy and
                  responsibility. You will work on features from ideation over
                  release to maintenance and shape the roadmap of the product.
                </li>
              </ul>

              <h3 className="fw-bold">Requirements</h3>
              <ul>
                <li className="text-secondary">
                  <strong className="text-white">PHP 8, Symfony</strong> — PHP
                  is the scripting language of our choice. We use Symfony
                  framework to build high-performance backends and APIs. Using
                  battle-tested components instead of reinventing the wheel each
                  time is something we feel strongly about.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">MariaDB, Doctrine</strong> — We
                  use Galera Cluster for high-availability of MariaDB and
                  Doctrine as persistence services.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    Elasticsearch, Redis, Kafka
                  </strong>{" "}
                  — We use Elasticsearch to offer full-text search across
                  millions of records. Redis as cache and Kafka for event
                  messaging.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Hosted on AWS with K8s</strong>{" "}
                  — All our components are containerised and run in Kubernetes.
                  Everything is automated from build to deployment.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    Enterprise tools for everything
                  </strong>{" "}
                  — GitLab as source control, CI/CD pipelines. Jira for issue
                  tracking. Confluence for documentation. Slack for internal
                  communication. IDE of your choice with paid subscription.
                </li>
              </ul>

              <h3 className="fw-bold">You will be a great fit if...</h3>
              <ul>
                <li className="text-secondary">
                  <strong className="text-white">
                    You have worked before in our tech stack
                  </strong>{" "}
                  — We don’t expect you to have a background in everything we
                  use, but we do expect you to have strong PHP fundamentals and
                  ideally a background working with Symfony. You also understand
                  the concepts of domain-driven design and have worked before on
                  similar projects.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    You have 3+ years of experience
                  </strong>{" "}
                  — You have a minimum of 3 years of working experience in a
                  similar role as a software engineer.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    You're highly productive while writing quality code
                  </strong>{" "}
                  — We release updates regularly. You can break down big
                  projects into small deliverables, while caring about the
                  outcome and quality.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    A genuine interest in technology
                  </strong>{" "}
                  — You have a desire for improvement and progress. You
                  understand every technology has a trade-off.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    Independent and empathetic communicator
                  </strong>{" "}
                  — You are independent in written and verbal communication
                  (English). You're thriving in a team environment.
                </li>
              </ul>

              <h3 className="fw-bold">What we offer</h3>
              <ul>
                <li className="text-secondary">
                  <strong className="text-white">
                    Engineering environment
                  </strong>{" "}
                  — Almost all of us are engineers or have an engineering
                  background. We nurture an engineering mentality with great
                  care. You will always find somebody with a specific skill set
                  or technology you need help with.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">A place to grow</strong> — We
                  provide options and guidance for your advancement and growth.
                  We want you to become an expert in your field.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    Team-based organization
                  </strong>{" "}
                  — We are organized in teams, working on specific projects or
                  topics for a longer time. You will have the opportunity to
                  dive deep into technically challenging topics.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">We love the Cloud</strong> —
                  Most of our products are based on Cloud-native architecture.
                  You’ll get the chance to work on some of the latest approaches
                  in modern app development.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">We'll treat you well</strong> —
                  Get a competitive salary, bonuses, and supplementary pension
                  insurance. You choose if you want to work remotely or onsite.
                  Plus, we provide new equipment and the latest development
                  tools.
                </li>
              </ul>

              <h3 className="fw-bold">Pay, benefits, perks</h3>
              <ul>
                <li className="text-secondary">
                  <strong className="text-white">Competitive salary</strong>{" "}
                  with salary raises proportionally to your growth.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Generous annual leave</strong>.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">
                    500 € / year for additional technical equipment
                  </strong>
                  to spend per your choice.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Educational budget</strong> —
                  opportunity for advancement and growth through conferences,
                  workshops, and lectures.
                </li>
                <li className="text-secondary">
                  <strong className="text-white">New Mac or PC laptop</strong>,
                  monitors and accessories, headset, height-adjustable desk
                  (onsite).
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Award-winning office</strong>{" "}
                  in the heart of BTC (Slovenia's biggest commercial district).
                </li>
                <li className="text-secondary">
                  Always fresh fruits, an endless stream of coffee and tea
                  (onsite).
                </li>
                <li className="text-secondary">
                  <strong className="text-white">Flexible working hours</strong>
                  , work from home.
                </li>
              </ul>
              <h3>How to apply</h3>
              <div>
                If you're interested in this position and would like to join our
                team, please send us an email at &nbsp;
                <a href="mailto:careers@cargoportconnect.com">
                  careers@cargoportconnect.com
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendEngineer;
