import React, { Component } from "react";

class HeaderDocument extends Component {
  constructor(props) {
    super(props);

    const { Document } = props;
    this.state = { Document };
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 style={{ margin: "0px" }}>{this.state.Document}</h3>
      </div>
    );
  }
}

export default HeaderDocument;
