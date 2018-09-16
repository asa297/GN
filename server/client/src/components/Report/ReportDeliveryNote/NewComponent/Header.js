import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end"
        }}
      >
        <Link to="/report/reportdeliverynote">
          <i className="medium material-icons">chevron_left</i>
        </Link>

        <h3>New Delivery Note Invertory</h3>
        <div />
      </div>
    );
  }
}

export default Header;
