import React from "react";
import { Link } from "react-router-dom";
import Report_CSS from "../../../../Style/CSS/Report_OUT_INV_CSS.css";

const SearchHeader = () => {
  return (
    <div className={Report_CSS.headerReport}>
      <div>
        <Link to="/report">
          <i className="medium material-icons">chevron_left</i>
        </Link>
      </div>
      <div>
        <h3 className="center" style={{ marginTop: "0px" }}>
          Daily Inventory Report
        </h3>
      </div>
      <div />
    </div>
  );
};

export default SearchHeader;
