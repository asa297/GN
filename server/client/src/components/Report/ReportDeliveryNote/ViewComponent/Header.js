import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    const { DN_Id, DN_Status, DN_StatusName } = props;
    this.state = {
      DN_Id,
      DN_Status,
      DN_StatusName
    };
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Link to="/report/reportdeliverynote">
          <i className="medium material-icons">chevron_left</i>
        </Link>

        <h3 style={{ margin: "0px" }}>
          Delivery Note Invertory - #{this.state.DN_Id}
          {this.state.DN_Status === 1 ? (
            <a className="green btn-flat white-text">
              {this.state.DN_StatusName}
            </a>
          ) : null}
          {this.state.DN_Status === 2 ? (
            <a className="green btn-flat white-text">
              {this.state.DN_StatusName}
            </a>
          ) : null}
          {this.state.DN_Status === 3 ? (
            <a className="red btn-flat white-text">
              {this.state.DN_StatusName}
            </a>
          ) : null}
          {this.state.DN_Status === 4 ? (
            <a className="blue btn-flat white-text">
              {this.state.DN_StatusName}
            </a>
          ) : null}
        </h3>
        <div />
      </div>
    );
  }
}

export default Header;
