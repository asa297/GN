import React, { Component } from "react";
import Detail from "./payment/Detail";
import Payment from "./payment/Payment";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      groupCode,
      discount,
      total,
      credit,
      cash,
      creditcharge,
      receivecash,
      changecash,
      grandtotal,
      RecordNameBy
    } = this.props.print_value;

    this.setState({
      groupCode,
      discount,
      total,
      credit,
      cash,
      creditcharge,
      receivecash,
      changecash,
      grandtotal,
      RecordNameBy
    });
  }

  renderContentHalfLeft() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <Detail
              label="รหัสกรุ๊ป Group Code"
              text={this.state.groupCode}
              fontSize="12px"
            />
          </div>
          <div style={{ width: "50%" }}>
            <Detail
              label="ผู้รับเงิน Recipient"
              text={this.state.RecordNameBy}
              fontSize="12px"
            />
          </div>
        </div>
        <Detail
          label="วิธีการชำระเงิน Payment Method"
          text="Both"
          fontSize="12px"
        />
        <Detail label="หมายเหตุ Remarks" text="" fontSize="12px" />
      </div>
    );
  }

  renderContentHalfRight() {
    return this.renderContentPayment();
  }

  renderContentPayment() {
    const ContentNormal = (
      <div>
        <Payment label="ยอดรวม Total" text={this.state.total} fontSize="12px" />
        <Payment
          label="ส่วนลด Discount"
          text={this.state.discount}
          fontSize="12px"
        />
        <Payment
          label="เครดิต Credit"
          text={this.state.credit}
          fontSize="12px"
        />
        <Payment
          label="เครดิตชาร์จ Credit Charge"
          text={this.state.creditcharge}
          fontSize="12px"
        />
        <Payment
          label="เงินทอน Change Cash"
          text={this.state.changecash}
          fontSize="12px"
        />
        <Payment
          label="ยอดสุดท้าย Grand Total"
          text={this.state.grandtotal}
          fontSize="12px"
        />
      </div>
    );
    const ContentDiscount = (
      <div>
        <Payment label="ยอดรวม Total" text={this.state.total} fontSize="12px" />
        <Payment
          label="ส่วนลด Discount"
          text={this.state.discount}
          fontSize="12px"
        />
        <Payment
          label="เงินทอน Change Cash"
          text={this.state.changecash}
          fontSize="12px"
        />
        <Payment
          label="ยอดสุดท้าย Grand Total"
          text={this.state.grandtotal}
          fontSize="12px"
        />
      </div>
    );
    const ContentNoDiscount = (
      <div>
        <Payment label="ยอดรวม Total" text={this.state.total} fontSize="12px" />
        <Payment
          label="เงินทอน Change Cash"
          text={this.state.changecash}
          fontSize="12px"
        />
        <Payment
          label="ยอดสุดท้าย Grand Total"
          text={this.state.grandtotal}
          fontSize="12px"
        />
      </div>
    );

    if (this.state.discount === 0 && this.state.credit === 0) {
      return ContentNoDiscount;
    } else if (this.state.discount > 0 && this.state.credit === 0) {
      return ContentDiscount;
    } else {
      return ContentNormal;
    }
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "55%", height: "140px" }}>
          {this.renderContentHalfLeft()}
        </div>
        <div style={{ width: "35%", height: "140px" }}>
          {this.renderContentHalfRight()}
        </div>
      </div>
    );
  }
}

export default Footer;
