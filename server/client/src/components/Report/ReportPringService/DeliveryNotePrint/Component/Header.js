import React, { Component } from "react";
import logo from "./logo.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { DN_Id, LastModifyDate, LastModifyByName } = this.props.print_value;

    this.setState({ DN_Id, LastModifyDate, LastModifyByName });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <img
          style={{
            width: "65%",
            height: "85px",
            borderRadius: "0px 20px 20px 0px"
          }}
          src={logo}
          alt="des"
        />
        <div
          style={{
            marginLeft: "5px",
            width: "35%",
            height: "85px",
            background: "#cccccc",
            borderRadius: "20px 0px 0px 20px",
            padding: "10px"
          }}
        >
          <div>DN ID : {this.state.DN_Id}</div>
          <div style={{ marginTop: "-3px" }}>
            Date : {new Date(this.state.LastModifyDate).toLocaleDateString()}{" "}
            {new Date(this.state.LastModifyDate).toLocaleTimeString()}
          </div>
          <div style={{ marginTop: "-3px" }}>
            Last Modify By : {this.state.LastModifyByName}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
