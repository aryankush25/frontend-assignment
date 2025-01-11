import React from "react";
import "./Error.css";

const Error = ({ message }) => {
  return (
    <div className="container">
      <div className="error">Error: {message}</div>
    </div>
  );
};

export default Error;
