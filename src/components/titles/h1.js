import React from "react";

const H1 = (props) => {
  return (
    <div className={`h1-container ${props.className}`}>
      <span className="line-block"></span>
      <h1 className="title-h1"> {props.children}</h1>
    </div>
  );
};

export default H1;
