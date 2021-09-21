import React from "react";
import "./titles.scss";

const H1 = (props) => {
  return (
    <div className={`d-flex m-3 ${props.className}`}>
      <span className="line-block"></span>
      <h1 className="title-h1"> {props.children}</h1>
    </div>
  );
};

export default H1;
