import React from "react";
import "./Header.css";
import HeaderLogo from "../../img/Gradient_wave_filil.svg";
import LivePlayer from "../LivePlayer/LivePlayer";

const Header = ({ description, isLive }) => {
    return (
        <header className="Header">
            <img className="Float" src={HeaderLogo} alt="headerlogo" />
            <div className="Page-container">
                <h1 className="Heading-large">Malmö Antenn</h1>
                <p className="Description">{description}</p>
                {isLive && <LivePlayer />}
            </div>
        </header>
    );
};

export default Header;
