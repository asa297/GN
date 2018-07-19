import React from "react";
import { Link } from "react-router-dom";

import Report_CSS from "../../../../../Style/CSS/Report_OUT_INV_CSS.css";

const Header = ({ date }) => {
  return (
    <div className={Report_CSS.headerOutboundReport}>
      <Link to="/report/reportdailyinv">
        <i className="medium material-icons">chevron_left</i>
      </Link>
      <h3>Daily Inventory Report @ {date}</h3>
      <div />
    </div>
  );
};

export default Header;
