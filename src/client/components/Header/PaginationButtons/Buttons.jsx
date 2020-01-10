import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faLongArrowAltLeft
} from "@fortawesome/free-solid-svg-icons";
import "./PaginationButtons.css";

export default function Buttons(props) {
  const { index, total, loop, prevHandler, nextHandler } = props;
  return (
    <div className="Wrapper">
      {(loop || index !== 0) && (
        <div className="Left Pagination-Button" onClick={prevHandler}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </div>
      )}
      {(loop || index !== total - 1) && (
        <div className="Right Pagination-Button" onClick={nextHandler}>
          <FontAwesomeIcon icon={faLongArrowAltRight} />
        </div>
      )}
    </div>
  );
}
