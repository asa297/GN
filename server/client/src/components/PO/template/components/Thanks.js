import React, { Component } from "react";
class Thanks extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <div
          style={{ width: "90%", display: "flex", justifyContent: "flex-end" }}
        >
          <font style={{ fontSize: "20px", fontWeight: "bold" }}>
            Thank you for visiting us!
          </font>
        </div>
      </div>
    );
  }
}

export default Thanks;
