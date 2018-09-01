import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import POItemField from "./POItemField";
import formFields from "./formFields";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

class POPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: props.socket,
      credit_charge_status: false
    };
  }

  componentWillReceiveProps({ inbound_po }) {
    if (inbound_po.values) {
      if (inbound_po.values.group_select) {
        const { orgTypeId } = inbound_po.values.group_select;
        this.setState({ orgTypeId });
      }

      if (inbound_po.values.credit) {
        this.setState({ credit_charge_status: true });
      } else {
        this.setState({ credit_charge_status: false });
      }
    }
  }

  renderFieldDC() {
    const { name, label } = formFields[0];
    return (
      <Field
        name={name}
        key={name}
        label={label}
        component={POItemField}
        type="text"
        onChange={event => this.setState({ discount: event.target.value })}
        onBlur={event => this.onBlurDC(event)}
      />
    );
  }

  onBlurDC(event) {
    let { value } = event.target;
    if (value || value === "") {
      if (value === "") {
        value = parseInt(0, 10);
      } else {
        value = parseInt(value, 10);
      }

      if (value >= 0 && value <= 100) {
        const { socket } = this.state;

        const { auth } = this.props;

        socket.emit("dc", { value, auth });
      }
    }
  }

  renderFieldCredit() {
    const { name, label } = formFields[1];
    return (
      <Field
        name={name}
        key={name}
        label={label}
        component={POItemField}
        type="text"
        onChange={event => this.setState({ credit: event.target.value })}
        onBlur={event => this.onBlurCredit(event)}
      />
    );
  }

  onBlurCredit(event) {
    let { value } = event.target;
    if (value || value === "") {
      if (value === "") {
        value = parseInt(0, 10);
      } else {
        value = parseInt(value, 10);
      }

      if (value >= 0) {
        const { socket } = this.state;

        const { auth } = this.props;

        socket.emit("credit", { value, auth });
      }
    }
  }

  renderFieldCreditCharge() {
    const { name, label } = formFields[2];
    return (
      <Field
        name={name}
        key={name}
        label={label}
        component={POItemField}
        type="text"
        onChange={event => this.setState({ credit_charge: event.target.value })}
        onBlur={event => this.onBlurCreditCharge(event)}
      />
    );
  }

  onBlurCreditCharge(event) {
    let { value } = event.target;
    if (value || value === "") {
      if (value === "") {
        value = parseInt(0, 10);
      } else {
        value = parseInt(value, 10);
      }

      if (value >= 0) {
        const { socket } = this.state;

        const { auth } = this.props;

        socket.emit("creditcharge", { value, auth });
      }
    }
  }

  render() {
    return (
      <div className={PO_CSS.DC_CR_con}>
        <div style={{ width: "30%" }}>{this.renderFieldDC()}</div>
        <div style={{ width: "30%" }}>{this.renderFieldCredit()}</div>
        <div style={{ width: "30%" }}>
          {this.state.credit_charge_status
            ? this.renderFieldCreditCharge()
            : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ form: { inbound_po }, auth }) {
  return { inbound_po, auth };
}

export default reduxForm({
  form: "inbound_po"
})(connect(mapStateToProps)(POPayment));
