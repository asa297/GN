import React, { Component } from "react";

class ReportPOView extends Component {
  constructor(props) {
    super(props);
    const { orderId } = props.location.state;
    this.state = {
      orderId
    };
  }

  render() {
    return <div>gg</div>;
  }
}
export default ReportPOView;
