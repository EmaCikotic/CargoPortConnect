import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; //fontawesome icons
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

//documents
import PrivacyPolicy from "./PrivacyPolicy.pdf";
import TermsOfService from "./TermsOfService.pdf";

///https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable

//reference for the privacy policy https://easylegaldocs.com/templates/policies/privacy-policy/

const Footer = () => {
  return (
    <footer className="footer mt-auto bg-light py-3 ">
      <div className=" d-flex justify-content-center gap-3 ">
        <a
          className={`${styles.social_media_link} `}
          href="https://www.instagram.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-instagram  fa-lg"></i>
        </a>
        <a
          className={`${styles.social_media_link}`}
          href="https://www.facebook.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-facebook  fa-lg"></i>
        </a>

        <a
          className={`${styles.social_media_link} `}
          href="https://x.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-x-twitter  fa-lg"></i>
        </a>

        <a
          className={`${styles.social_media_link}`}
          href="https://www.linkedin.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin fa-lg"></i>
        </a>
      </div>

      <hr />
      <div className=" footer-bottom text-center">
        <p>
          © {new Date().getFullYear()} CargoPortConnect
          <br />
          All rights reserved
        </p>
        <ul
          className={`${styles.social_media_link}footer-links list-unstyled d-flex justify-content-center gap-3 `}
        >
          <li>
            <a
              className={`${styles.social_media_link}`}
              href={PrivacyPolicy}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              className={`${styles.social_media_link}`}
              href={TermsOfService}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
