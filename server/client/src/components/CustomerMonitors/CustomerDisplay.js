import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import numeral from "numeral";
import _ from "lodash";

import background from "./background.png";
import logo from "./logo.png";
import textbar from "./textbar.png";
import thanks from "./thanks.png";

class CustomerDisplay extends Component {
  constructor() {
    super();

    const socket = io("https://www.giornies.com", {
      transports: ["websocket"]
    });

    this.state = {
      socket,
      showitem: [],
      showprice: "",
      showchange: 0,
      status: -1,
      grandtotal: 0,
      subtotal: 0,
      discount: 0,
      credit: 0,
      creditcharge: 0
    };
  }
  componentDidMount() {
    const { socket } = this.state;

    const { auth } = this.props;

    socket.emit("joinroom", { auth });

    socket.on("showitem", data => {
      const { item_code, item_name, item_price, countQty, status } = data;

      let { showitem } = this.state;

      showitem.unshift({
        item: `${item_code} - ${item_name}`,
        item_price: `${status === 2 ? "-" : ""}${item_price}`
      });

      this.setState({
        showitem,
        showprice: `${status === 2 ? "-" : ""}${item_price}`,
        subtotal: this.state.subtotal + countQty * item_price,
        status
      });

      this.recalculate();
    });

    socket.on("dc", data => {
      let { showitem } = this.state;

      showitem.unshift({
        item: `Discount Total`,
        item_price: `-${this.state.subtotal * (data / 100)}`
      });

      // const showitem = `Your Discount`;
      const showprice = `-${this.state.subtotal * (data / 100)}`;
      const status = 2;

      this.setState({ showitem, showprice, discount: data, status });
      this.recalculate();
    });

    socket.on("credit", data => {
      let { showitem } = this.state;

      showitem.unshift({
        item: `Credit Total`,
        item_price: `-${data}`
      });

      // const showitem = `Your Credit`;
      const showprice = `-${data}`;
      const status = 2;

      this.setState({ showitem, showprice, credit: data, status });
      this.recalculate();
    });

    socket.on("creditcharge", data => {
      let { showitem } = this.state;

      showitem.unshift({
        item: `Credit Charge Total`,
        item_price: `${this.state.credit * (data / 100)}`
      });

      // const showitem = `Your Credit Charge`;
      const showprice = `${this.state.credit * (data / 100)}`;
      const status = 1;

      this.setState({ showitem, showprice, creditcharge: data, status });

      this.recalculate();
    });

    socket.on("closepo", () => {
      this.setState({
        showitem: [],
        showprice: "",
        status: -1,
        grandtotal: 0,
        subtotal: 0,
        discount: 0,
        credit: 0,
        creditcharge: 0
      });
    });

    socket.on("openpo", () => {
      this.setState({
        showitem: [],
        showprice: "",
        status: -1,
        grandtotal: 0,
        subtotal: 0,
        discount: 0,
        credit: 0,
        creditcharge: 0
      });
    });

    socket.on("submitpo", data => {
      console.log(data);
      // const showitem = `RECEIVE && CHANGE`;
      const showchange = `${data - this.state.grandtotal}`;
      // const grandtotal = data - this.state.grandtotal;
      const status = 1;

      this.setState({
        // showitem,
        showprice: data,
        showchange,
        status,
        // grandtotal,
        subtotal: 0,
        discount: 0,
        credit: 0,
        creditcharge: 0
      });
    });
  }

  componentWillUnmount() {
    const { socket } = this.state;

    socket.disconnect();
  }

  recalculate() {
    const { subtotal, discount, credit } = this.state;

    const resultDiscount = subtotal * (discount / 100);

    const resultGrandTotal = subtotal - resultDiscount - credit;

    this.setState({ grandtotal: resultGrandTotal });
  }

  render() {
    console.log(this.state);
    return (
      <div
        style={{ height: "100vh", overflow: "hidden", fontFamily: "Kanit " }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${background})`,
            backgroundSize: "100% 100%",
            display: "flex"
          }}
        >
          <div style={{ width: "70%", marginTop: "2%" }}>
            <div
              style={{
                height: "17%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <img
                style={{
                  width: "20%",
                  height: "100%"
                }}
                src={logo}
                alt="des"
              />
            </div>
            <div
              style={{
                height: "6%",
                width: "95%",
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%"
                }}
                src={textbar}
                alt="des"
              />
            </div>
            <div
              style={{
                height: "70%",
                width: "95%",
                backgroundColor: "red",
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              c
            </div>
          </div>
          <div style={{ width: "30%", marginTop: "2%" }}>
            <div
              style={{
                backgroundColor: "#EFE6C9",
                width: "95%",
                height: "96%",
                borderRadius: "50px 50px 50px 50px"
              }}
            >
              <div
                style={{
                  padding: "20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                  // justifyContent: "space-around"
                }}
              >
                <div style={{ height: "50%" }}>
                  <h2
                    style={{
                      marginTop: "20px"
                    }}
                  >
                    PRODUCT
                  </h2>
                  {_.map(this.state.showitem, ({ item, item_price }, index) => {
                    if (index <= 7) {
                      return (
                        <div
                          key={index}
                          style={{ marginLeft: "50px", width: "80%" }}
                        >
                          <h4
                            style={{
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <div
                              style={{
                                width: "60%",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                              }}
                            >
                              {item}
                            </div>
                            <div>{numeral(item_price).format("0,0.00")} ฿</div>
                          </h4>
                        </div>
                      );
                    } else {
                      return false;
                    }
                  })}
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2
                    style={{
                      marginTop: "20px",
                      width: "35%"
                    }}
                  >
                    TOTAL
                  </h2>
                  <div
                    style={{
                      width: "65%",
                      fontSize: "35px",
                      marginLeft: "10px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {numeral(this.state.grandtotal).format("0,0.00")} ฿
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2
                    style={{
                      marginTop: "20px",
                      width: "35%"
                    }}
                  >
                    CASH
                  </h2>
                  <div
                    style={{
                      width: "65%",
                      fontSize: "35px",
                      marginLeft: "10px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {numeral(this.state.showprice).format("0,0.00")} ฿
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2
                    style={{
                      marginTop: "20px",
                      width: "35%"
                    }}
                  >
                    CHANGE
                  </h2>
                  <div
                    style={{
                      width: "65%",
                      fontSize: "35px",
                      marginLeft: "10px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {numeral(this.state.showchange).format("0,0.00")} ฿
                  </div>
                </div>

                <div style={{ height: "13%" }} />
                <div>
                  <img
                    style={{
                      width: "100%"
                    }}
                    src={thanks}
                    alt="des"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(CustomerDisplay);
