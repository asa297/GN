import React from "react";
import { Link } from "react-router-dom";
import InboundOrgList from "./Inbound-Org/InboundOrgList";

const InboundOrg = () => {
  return (
    <div className="container">
      <div>
        <h3>
          InBound-Org
          <Link
            to="/inboundorg/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </h3>
      </div>
      <InboundOrgList />
    </div>
  );
};

export default InboundOrg;
