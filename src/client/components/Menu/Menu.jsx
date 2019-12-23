import React from "react";
import "./Menu.css";
import logo from "../../img/logo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faMixcloud
} from "@fortawesome/free-brands-svg-icons";

const Menu = () => {
  const handleTracking = e => {
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    dataLayer.push({
      event: "social_link",
      eventData: {
        eventCategory: "Social Media",
        eventAction: "Click",
        eventLabel: e.target.href
      }
    });
  };
  return (
    <nav className="Menu">
      <ul className="Menu-navList">
        <li className="Menu-navItem">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="Menu-navItem">
          <NavLink to="/archive">Archive</NavLink>
        </li>
      </ul>
      <NavLink to="/" aria-label="Go to Start Page">
        <img className="Logo" src={logo} alt="logo" />
      </NavLink>
      <div className="Menu-socials">
        <a
          href="https://www.instagram.com/malmoantenn/"
          aria-label="Go to Malmö Antenn on Instagram"
          onClick={e => handleTracking(e)}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.facebook.com/mlmantenn/"
          aria-label="Go to Malmö Antenn on Facebook"
          onClick={e => handleTracking(e)}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://www.mixcloud.com/malmoantenn/"
          aria-label="Go to Malmö Antenn on Mixcloud"
          onClick={e => handleTracking(e)}
        >
          <FontAwesomeIcon icon={faMixcloud} />
        </a>
      </div>
    </nav>
  );
};

export default Menu;
