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
          {/* <div style={{ width: "50%" }}>
            <Detail
              label="รหัสกรุ๊ป Group Code"
              text={this.state.groupCode}
              fontSize="12px"
            />
          </div> */}
          {/* <div style={{ width: "50%" }}>
            <Detail
              label="ผู้รับเงิน Recipient"
              text={this.state.RecordNameBy}
              fontSize="12px"
            />
          </div> */}
        </div>
      </div>
    );
  }

  renderContentHalfRight() {
    return this.renderContentPayment();
  }

  renderContentPayment() {
    const ContentNormal = (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "22.5%" }}>
            <Payment
              labelThai="ยอดรวม"
              labelEng="Total"
              text={this.state.total}
              fontSizeheader="10px"
              fontSizecontent="12px"
            />
          </div>

          <div style={{ width: "22.5%" }}>
            <Payment
              labelThai="ส่วนลด"
              labelEng="Discount"
              text={this.state.discount}
              fontSizeheader="10px"
              fontSizecontent="12px"
            />
          </div>

          <div style={{ width: "22.5%" }}>
            <Payment
              labelThai="เครดิต"
              labelEng="Credit"
              text={this.state.credit}
              fontSizeheader="10px"
              fontSizecontent="12px"
            />
          </div>

          <div style={{ width: "22.5%" }}>
            <Payment
              labelThai="เครดิตชาร์จ"
              labelEng="Credit Charge"
              text={this.state.creditcharge}
              fontSizeheader="10px"
              fontSizecontent="12px"
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "22.5%" }}>
            <Payment
              labelThai="ยอดสุดท้าย"
              labelEng="Grand Total"
              text={this.state.grandtotal}
              fontSizeheader="10px"
              fontSizecontent="12px"
            />
          </div>

          <div style={{ width: "22.5%" }}>
            <Payment
              labelThai="เงินที่รับ"
              labelEng="Receive Cash"
              text={this.state.receivecash}
              fontSizeheader="10px"
              fontSizecontent="12px"
            />
          </div>

          <div style={{ width: "22.5%" }}>
            <Payment
              labelThai="เงินทอน"
              labelEng="Change Cash"
              text={this.state.changecash}
              fontSizeheader="10px"
              fontSizecontent="12px"
            />
          </div>

          <div style={{ width: "22.5%" }} />
        </div>
      </div>
    );
    const ContentDiscount = (
      <div>
        <Payment
          labelThai="ยอดรวม"
          labelEng="Total"
          text={this.state.total}
          fontSize="10px"
        />
        <Payment
          labelThai="ส่วนลด"
          labelEng="Discount"
          text={this.state.discount}
          fontSize="10px"
        />
        <Payment
          labelThai="ยอดสุดท้าย"
          labelEng="Grand Total"
          text={this.state.grandtotal}
          fontSize="10px"
        />
        <Payment
          labelThai="เงินที่รับ"
          labelEng="Receive Cash"
          text={this.state.receivecash}
          fontSize="10px"
        />
        <Payment
          labelThai="เงินทอน"
          labelEng="Change Cash"
          text={this.state.changecash}
          fontSize="10px"
        />
      </div>
    );
    const ContentNoDiscountCredit = (
      <div>
        <Payment
          labelThai="ยอดรวม"
          labelEng="Total"
          text={this.state.total}
          fontSize="10px"
        />
        <Payment
          labelThai="ยอดสุดท้าย"
          labelEng="Grand Total"
          text={this.state.grandtotal}
          fontSize="10px"
        />
        <Payment
          labelThai="เครดิต"
          labelEng="Credit"
          text={this.state.credit}
          fontSize="10px"
        />
        <Payment
          labelThai="เครดิตชาร์จ"
          labelEng="Credit Charge"
          text={this.state.creditcharge}
          fontSize="10px"
        />
        <Payment
          labelThai="เงินที่รับ"
          labelEng="Receive Cash"
          text={this.state.receivecash}
          fontSize="10px"
        />
        <Payment
          labelThai="เงินทอน"
          labelEng="Change Cash"
          text={this.state.changecash}
          fontSize="10px"
        />
      </div>
    );
    const ContentNoDiscount = (
      <div>
        <Payment
          labelThai="ยอดรวม"
          labelEng="Total"
          text={this.state.total}
          fontSize="10px"
        />
        <Payment
          labelThai="ยอดสุดท้าย"
          labelEng="Grand Total"
          text={this.state.grandtotal}
          fontSize="10px"
        />
        <Payment
          labelThai="เงินที่รับ"
          labelEng="Receive Cash"
          text={this.state.receivecash}
          fontSize="10px"
        />
        <Payment
          labelThai="เงินทอน"
          labelEng="Change Cash"
          text={this.state.changecash}
          fontSize="10px"
        />
      </div>
    );

    if (this.state.discount === 0 && this.state.credit === 0) {
      return ContentNoDiscount;
    } else if (this.state.discount > 0 && this.state.credit === 0) {
      return ContentDiscount;
    } else if (this.state.discount === 0 && this.state.credit > 0) {
      return ContentNoDiscountCredit;
    } else {
      return ContentNormal;
    }
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* <div style={{ width: "55%", height: "140px" }}>
          {this.renderContentHalfLeft()}
        </div> */}
        <div style={{ width: "100%", height: "140px" }}>
          {this.renderContentHalfRight()}
        </div>
      </div>
    );
  }
}

export default Footer;
