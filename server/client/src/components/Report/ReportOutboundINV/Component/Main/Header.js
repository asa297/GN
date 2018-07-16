import React from "react";
import { Link } from "react-router-dom";

const SearchHeader = () => {
  return (
    <div className="header_report">
      <div>
        <Link to="/report">
          <i className="medium material-icons">chevron_left</i>
        </Link>
      </div>
      <div>
        <h3 className="center" style={{ margin: "0px" }}>
          Outbound Inventory Report
        </h3>
      </div>
      <div />
    </div>
  );
};

export default SearchHeader;
