import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      case 1:
        return (
          <div>
            <li>
              <Link to="/report/reportpo">Purchase Order</Link>
            </li>
            <li>
              <Link to="/report/reportinv">Inventory</Link>
            </li>
          </div>
        );
      default:
        return (
          <li>
            <Link to="/home">Home</Link>
          </li>
        );
    }
  }
};
