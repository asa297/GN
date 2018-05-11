import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      default:
        return (
          <li>
            <Link to="/home">Home</Link>
          </li>
        );
      case 1:
        return (
          <div>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/inboundorg">In-Bound Org</Link>
            </li>
            <li>
              <Link to="/inboundpo">In-Bound PO</Link>
            </li>
          </div>
        );
    }
  }
};
