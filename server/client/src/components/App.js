import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import MenuContentRoute from "../utils/MenuContentRoute";

import Header from "./Header";

import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  RenderMenuContentRoute() {
    return (
      <div>
        {MenuContentRoute(this.props.auth ? this.props.auth : <Header />)}
      </div>
    );
  }

  render() {
    return <BrowserRouter>{this.RenderMenuContentRoute()}</BrowserRouter>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
