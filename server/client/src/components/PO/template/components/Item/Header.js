import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "3px"
        }}
      >
        <div
          style={{
            background: "#999999",
            color: "white",
            border: "1px thin #999999",
            padding: "2px 10px 2px 10px",
            borderRadius: "7px"
          }}
        >
          <font
            style={{
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            ใบเสร็จรับเงิน / OFFICIAL RECEIPT
          </font>
        </div>
        <div />
        <div>
          <font style={{ fontSize: "20px", fontWeight: "bold" }}>
            {this.props.copy}
          </font>
        </div>
      </div>
    );
  }
}

export default Header;
