import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>
          <Link to="/report">
            <i className="medium material-icons">chevron_left</i>
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h3 className="center" style={{ marginTop: "0px" }}>
            Report Delivery Note Invertory
          </h3>
          <Link
            to="/report/reportdeliverynote/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </div>
        <div />
      </div>
    );
  }
}

export default Header;
