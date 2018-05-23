import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

class POPayment extends Component {
  constructor(props) {
    super(props);

    const { orgTypeId } = this.props.inbound_po.values.group_select;

    this.state = {
      orgTypeId,
      creditChargeStatus: false,
      creditCharge: 0
    };
  }

  componentDidMount() {
    const { orgTypeId } = this.state;

    this.setState({
      creditChargeStatus: orgTypeId === 1 ? true : false,
      creditCharge: orgTypeId === 1 ? 2 : 0
    });

    // const { orgTypeId } = this.props.inbound_po.group_select;
    // this.setState({ orgTypeId });
    // console.log(this.state);
  }

  render() {
    console.log(this.state);
    return <div className="container">POPayment</div>;
  }
}

function mapStateToProps({ form: { inbound_po } }) {
  return { inbound_po };
}

export default reduxForm({
  // validate,
  form: "inbound_po",
  destroyOnUnmount: false
})(connect(mapStateToProps, null)(POPayment));
