import React from "react";
import "./Header.css";
import HeaderLogo from "../../img/Gradient_wave_filil.svg";
import LivePlayer from "../LivePlayer/LivePlayer";
import Carousel from "re-carousel";
import IndicatorDots from "./IndicatorDots/IndicatorDots";
import Buttons from "./PaginationButtons/Buttons";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { stripHtml } from "../../Views/StartView/StartView.helpers";

export const renderHeader = (description, isLive) => {
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

export const renderBlogPost = blogpost => {
  if (blogpost) {
    return (
      <NavLink className="Blog-routerLink" to={blogpost.slug}>
        <header
          className="Blog-header"
          style={{
            backgroundImage: `url(${blogpost.acf.image.sizes.medium})`
          }}
        ></header>
        <div className="Page-container Absolute-hack">
          <h2 className="Heading-large Inverted">{blogpost.title.rendered}</h2>
          <p className="Blog-description Inverted">
            {stripHtml(blogpost.excerpt.rendered).replace(
              /\[&hellip;]/g,
              "..."
            )}
          </p>
          <p className="Link-blog Inverted">
            Go to blog <FontAwesomeIcon icon={faLongArrowAltRight} />
          </p>
        </div>
      </NavLink>
    );
  } else {
    return null;
  }
};

const Hero = ({ description, isLive, blogpost }) => {
  return (
    <Carousel auto loop widgets={[IndicatorDots, Buttons]}>
      {renderHeader(description, isLive)}
      {renderBlogPost(blogpost)}
    </Carousel>
  );
};

export default Hero;
