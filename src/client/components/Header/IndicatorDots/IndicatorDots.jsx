import React from "react";
import "./IndicatorDots.css";
function Dot(props) {
  return (
    <span
      className="Dot"
      style={{
        opacity: props.selected ? "1" : "0.3"
      }}
    />
  );
}

export default function IndicatorDots(props) {
  if (props.total < 2) {
    // Hide dots when there is only one dot.
    return <div className="Wrapper" />;
  } else {
    return (
      <div className="Wrapper">
        {Array.apply(null, Array(props.total)).map((x, i) => {
          return <Dot key={i} selected={props.index === i} />;
        })}
      </div>
    );
  }
}
