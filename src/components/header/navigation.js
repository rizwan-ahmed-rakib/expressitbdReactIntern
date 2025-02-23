import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const location = useLocation(); // বর্তমান URL খুঁজে বের করার জন্য

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          MyApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/StoreCreate" ? "active" : ""}`} to="/StoreCreate">
                StoreCreate
              </Link>
            </li>


            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/products" ? "active" : ""}`} to="/products">
                Products
              </Link>
            </li>
            {/*<li className="nav-item">*/}
            {/*  <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">*/}
            {/*    About*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*  <Link className={`nav-link ${location.pathname === "/services" ? "active" : ""}`} to="/services">*/}
            {/*    Services*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*  <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">*/}
            {/*    Contact*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*  <Link className={`nav-link ${location.pathname === "/test" ? "active" : ""}`} to="/test">*/}
            {/*    test*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
