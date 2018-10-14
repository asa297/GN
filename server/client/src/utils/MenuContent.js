import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      case 1:
        return [
          <li key="1">
            <Link to="/home">Home</Link>
          </li>,
          <li key="2">
            <Link to="/Org">Org</Link>
          </li>,
          <li key="3">
            <Link to="/Group">Group</Link>
          </li>,
          <li key="4">
            <Link to="/Seller">Seller</Link>
          </li>,
          <li key="5">
            <Link to="/Item">Item</Link>
          </li>,
          <li key="6">
            <Link to="/inboundpo">PO </Link>
          </li>,
          <li key="7">
            <Link to="/report">Report</Link>
          </li>
        ];

      case 2:
        return [
          <li key="1">
            <Link to="/home">Home</Link>
          </li>,
          <li key="2">
            <Link to="/Org">Org</Link>
          </li>,
          <li key="3">
            <Link to="/Group">Group</Link>
          </li>,
          <li key="4">
            <Link to="/Seller">Seller</Link>
          </li>,
          <li key="5">
            <Link to="/Item">Item</Link>
          </li>,
          <li key="6">
            <Link to="/inboundpo">PO </Link>
          </li>,
          <li key="7">
            <Link to="/report">Report</Link>
          </li>
        ];

      case 3:
        return [
          <li key="1">
            <Link to="/home">Home</Link>
          </li>,
          <li key="3">
            <Link to="/Group">Group</Link>
          </li>,
          <li key="4">
            <Link to="/Seller">Seller</Link>
          </li>,
          <li key="5">
            <Link to="/Item">Item</Link>
          </li>,
          <li key="6">
            <Link to="/inboundpo">PO </Link>
          </li>
        ];

      default:
        return (
          <li>
            <Link to="/home">Home</Link>
          </li>
        );
    }
  }
};
