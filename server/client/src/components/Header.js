import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
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
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  renderMenuContent() {
    return MenuContent(this.props.auth ? this.props.auth : null);
  }

  render() {
    return (
      <nav className="blue lighten-1">
        <div className="nav-wrapper">
          <ul className="brand-logo right">{this.renderLoginContent()}</ul>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            {this.renderMenuContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
