import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./template/TemplatePrint";

class POPrint extends Component {
  DonePO() {
    this.props.donePO();
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        {/* <ComponentToPrint
          ref={el => (this.componentRef = el)}
          print_value={this.props.print_value}
        />
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        /> */}
        <h3 className="center">
          กดปุ่ม Print เพื่อพิมพ์ใบเสร็จรับเงิน หรือ กดปุ่ม Done
          เพื่อทำรายการขายใหม่
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactToPrint
            trigger={() => (
              <button
                className="blue darken-4 btn-flat white-text waves-effect waves-light"
                style={{ marginLeft: "10px", marginTop: "30px" }}
                type="button"
              >
                <i className="material-icons left">local_printshop</i>
                Print
              </button>
            )}
            content={() => this.componentRef}
          />
          <button
            className="green btn-flat white-text right"
            style={{ marginLeft: "10px", marginTop: "30px" }}
            onClick={() => {
              this.DonePO();
            }}
            type="button"
          >
            <i className="material-icons left">navigate_next</i>
            Done
          </button>

          <div style={{ display: "none" }}>
            <ComponentToPrint
              ref={el => (this.componentRef = el)}
              print_value={this.props.print_value}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default POPrint;
