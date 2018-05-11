import React from "react";
import { Link } from "react-router-dom";

const InboundGroup = () => {
  return (
    <div className="container">
      <h3>
        Inbound-Group
        <Link
          to="/inboundgroup/new"
          className="btn-small blue"
          style={{ marginLeft: "20px" }}
        >
          <i className="material-icons">add</i>
        </Link>
      </h3>
    </div>
  );
};

export default InboundGroup;
