import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MenuContent from "../utils/MenuContent";

class Header extends Component {
  renderLoginContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <a className="btn-flat disabled" style={{ margin: "0px" }}>
              {this.props.auth.firstName}
            </a>
          </li>,
          <li key="2">
            <a className="waves-effect waves-light btn" href="/api/logout">
              Logout
            </a>
          </li>
        ];
    }
  }

  renderMenuContent() {
    return MenuContent(this.props.auth ? this.props.auth : null);
  }

  render() {
    return (
      <div>
        <nav className="light-blue">
          <div className="nav-wrapper container">
            <Link id="logo-container" className="brand-logo" to="/home">
              <i className="material-icons">home</i>
            </Link>
            <ul className="right hide-on-med-and-down">
              {this.renderMenuContent()}
              {this.renderLoginContent()}
            </ul>

            <ul id="nav-mobile" className="sidenav">
              {this.renderMenuContent()}
              {this.renderLoginContent()}
            </ul>
            <a data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
