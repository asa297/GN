import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import MenuContentRoute from "../utils/MenuContentRoute";

import Header from "./Header";
import DefaultHome from "./DefaultHome";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  RenderMenuContentRoute() {
    return MenuContentRoute(this.props.auth ? this.props.auth : null);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={DefaultHome} />
          {this.RenderMenuContentRoute()}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
