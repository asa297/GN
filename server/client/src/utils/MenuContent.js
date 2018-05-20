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
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/inboundorg">Org</Link>
            </li>
            <li>
              <Link to="/inboundgroup">Group</Link>
            </li>
            <li>
              <Link to="/inboundseller">Seller</Link>
            </li>
            <li>
              <Link to="/inbounditem">Item</Link>
            </li>
            <li>
              <Link to="/inboundpo">PO </Link>
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
