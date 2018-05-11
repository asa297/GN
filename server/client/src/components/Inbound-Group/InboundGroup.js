import React from "react";
import { Link } from "react-router-dom";
import InboundGroupList from "./InboundGroupList";

const InboundGroup = () => {
  return (
    <div className="container">
      <h3>
        InBound-Group
        <Link
          to="/inboundgroup/new"
          className="btn-small blue"
          style={{ marginLeft: "20px" }}
        >
          <i className="material-icons">add</i>
        </Link>
      </h3>
      <InboundGroupList />
    </div>
  );
};

export default InboundGroup;
