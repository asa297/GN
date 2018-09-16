import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ViewDocument extends Component {
  constructor(props) {
    super(props);
    const { DN } = props.location.state;

    this.state = {
      DN
    };
  }

  render() {
    return <div className="container">test</div>;
  }
}

export default withRouter(ViewDocument);
