import React, { Component } from "react";
import numeral from "numeral";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      group: { groupCode },
      seller: { sellerCode },
      cash,
      credit,
      receivecash,
      changecash
    } = this.props.print_value;

    let paymentMethod = "Cash";
    if (cash > 0 && credit !== 0) {
      paymentMethod = "Cash && Credit";
    } else if (cash === 0 && credit > 0) {
      paymentMethod = "Credit";
    }

    this.setState({
      groupCode,
      sellerCode,
      paymentMethod,
      receivecash,
      changecash
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3px"
        }}
      >
        <div style={{ display: "flex", width: "90%" }}>
          <div
            style={{
              width: "70%",
              height: "65px",
              background: "#cccccc",
              borderWidth: "2px 0px 2px 0px",
              borderStyle: "solid",
              borderColor: "white",
              borderRadius: "15px 0px 0px 15px",
              fontSize: "13px",
              paddingLeft: "20px"
            }}
          >
            <div>
              <b>รหัสกรุ๊ป / GroupId : </b>
              {this.state.groupCode}
            </div>
            <div>
              <b>รหัสพนักงานขาย / Service Rep ID : </b>
              {this.state.sellerCode}
            </div>
            <div>
              <b>ชำระโดย / Payment Method : </b>
              {this.state.paymentMethod}
            </div>
          </div>
          <div
            style={{
              width: "15%",
              height: "65px",
              background: "#cccccc"
            }}
          >
            <div
              style={{
                height: "50%",
                borderWidth: "2px 0px 2px 2px",
                borderStyle: "solid",
                borderColor: "white",
                fontSize: "13px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              <font>รับมา</font>
              <font style={{ marginTop: "-8px" }}>Amount Paid</font>
            </div>
            <div
              style={{
                height: "50%",
                borderWidth: "0px 0px 2px 2px",
                borderStyle: "solid",
                borderColor: "white",
                fontSize: "13px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              <font>เงินทอน</font>
              <font style={{ marginTop: "-8px" }}>Change</font>
            </div>
          </div>
          <div
            style={{
              width: "15%",
              height: "65px",
              background: "#cccccc"
            }}
          >
            <div
              style={{
                height: "50%",
                borderWidth: "2px 0px 2px 2px",
                borderStyle: "solid",
                borderColor: "white",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "5px"
              }}
            >
              {numeral(this.state.receivecash).format("0,0.00")} ฿
            </div>
            <div
              style={{
                height: "50%",
                borderWidth: "0px 0px 2px 2px",
                borderStyle: "solid",
                borderColor: "white",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "5px"
              }}
            >
              {numeral(this.state.changecash).format("0,0.00")} ฿
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
