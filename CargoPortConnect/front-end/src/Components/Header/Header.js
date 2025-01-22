import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider/UserProvider";
import styles from "./Header.module.css";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <i className="fa-solid fa-ship fa-beat icon"></i>
          <p className="company-name mt-3">CargoPortConnect</p>
        </Link>
        <ul className="navbar-nav d-flex flex-row gap-5">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/addContainer" className="nav-link">
                  Add Container
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/collection" className="nav-link">
                  Collection
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="btn btn-link nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
