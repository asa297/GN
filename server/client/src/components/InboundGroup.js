import React from "react";
import { Link } from "react-router-dom";

const InboundGroup = () => {
  return (
    <div>
      InboundGroup
      <div className="fixed-action-btn">
        <Link to="/inboundgroup/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default InboundGroup;
