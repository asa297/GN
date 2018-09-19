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
              <Link to="/report/reportpo">#101 Purchase Order</Link>
            </li>
            <li>
              <Link to="/report/reportdialycashbalance">
                #102 Daily Cash Balance
              </Link>
            </li>
            <li>
              <Link to="/report/reportdialycom">
                #103 Daily Commission Group
              </Link>
            </li>
            <li>
              <Link to="/report/reportinv">#201 Inventory</Link>
            </li>
            <li>
              <Link to="/report/reportinboundinv">#202 Inbound Inventory</Link>
            </li>
            <li>
              <Link to="/report/reportoutboundinv">
                #203 Outbound Inventory
              </Link>
            </li>
            <li>
              <Link to="/report/reportdailyinv">#204 Daily Inventory</Link>
            </li>
            <li>
              <Link to="/report/reportdeliverynote">
                #205 Delivery Note Inventory
              </Link>
            </li>
          </div>
        );
      case 2:
        return (
          <div>
            <li>
              <Link to="/report/reportpo">#101 Purchase Order</Link>
            </li>
            <li>
              <Link to="/report/reportdialycashbalance">
                #102 Daily Cash Balance
              </Link>
            </li>
            <li>
              <Link to="/report/reportdialycom">
                #103 Daily Commission Group
              </Link>
            </li>
            <li>
              <Link to="/report/reportinv">#201 Inventory</Link>
            </li>
            <li>
              <Link to="/report/reportinboundinv">#202 Inbound Inventory</Link>
            </li>
            <li>
              <Link to="/report/reportoutboundinv">
                #203 Outbound Inventory
              </Link>
            </li>
            <li>
              <Link to="/report/reportdailyinv">#204 Daily Inventory</Link>
            </li>
            <li>
              <Link to="/report/reportdeliverynote">
                #205 Delivery Note Inventory
              </Link>
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
