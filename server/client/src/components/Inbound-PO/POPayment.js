import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Toggle from "react-toggle";
import { reduxForm, Field, change } from "redux-form";

import POItemField from "./POItemField";
import formFields from "./formFields";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

let total_val;

class POPayment extends Component {
  constructor(props) {
    super(props);

    const { orgTypeId } = this.props.inbound_po.values.group_select;

    this.state = {
      orgTypeId,
      creditToggle: false,
      creditChargeStatus: false,
      creditCharge: 0,
      discount: 0,
      credit: 0,
      total: 0
    };
  }

  componentDidMount() {
    const { orgTypeId } = this.state;
    this.setState({
      creditChargeStatus: orgTypeId === 1 ? true : false,
      creditCharge: orgTypeId === 1 ? 2 : 0
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inbound_po.values.total) {
      this.setState({ total: nextProps.inbound_po.values.total });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(change("inbound_po", "grandtotal", total_val));
    this.props.dispatch(
      change("inbound_po", "cash", total_val - this.state.credit)
    );
  }

  renderFieldDC() {
    const { name } = formFields[0];
    return (
      <div>
        <Field
          name={name}
          key={name}
          label={name}
          component={POItemField}
          type="text"
          onChange={event => this.setState({ discount: event.target.value })}
        />
      </div>
    );
  }

  renderFieldCredit() {
    const { name } = formFields[1];
    return (
      <div>
        <Field
          name={name}
          key={name}
          label={name}
          component={POItemField}
          type="text"
          onChange={event => this.setState({ credit: event.target.value })}
        />
      </div>
    );
  }

  renderSum() {
    const {
      creditToggle,
      creditChargeStatus,
      creditCharge,
      discount
    } = this.state;

    const DC = parseInt(discount, 10);
    let { total } = this.state;

    if (DC !== 0 && DC > 0 && DC <= 100) {
      const dis = (100 - DC) / 100;
      total = total * dis;
    }

    if (creditToggle && creditChargeStatus) {
      const charge = 1 + creditCharge / 100;
      total = total * charge;
    }

    total_val = total;

    return (
      <h4 style={{ marginBottom: "0px" }}>Total : {total.toLocaleString()}</h4>
    );
  }

  renderToggle() {
    return (
      <Toggle
        defaultChecked={this.state.creditToggle}
        onChange={() => {
          this.setState({
            creditToggle: !this.state.creditToggle
          });
        }}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="center">
          <i>Step #4 -</i> Payments
        </h3>

        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFieldDC()}
          {this.renderToggle()}
          {this.state.creditToggle ? this.renderFieldCredit() : null}
          <div>{this.renderSum()}</div>
          <div className={PO_CSS.footer_PO}>
            <button
              type="button"
              className="red btn-flat white-text right"
              onClick={() => this.props.onCancal()}
            >
              Cancal
            </button>

            <button className="green btn-flat white-text right">Next</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values["discount"] && isNaN(values["discount"])) {
    errors["discount"] = "Require a Number";
  } else {
    if (values["discount"] < 0 || values["discount"] > 100) {
      errors["discount"] = "0% - 100%";
    }
  }

  if (!values["credit"]) {
    errors["credit"] = "Require a value";
  } else if (isNaN(values["credit"])) {
    errors["credit"] = "Require a Number";
  } else {
    if (values["credit"] < 0) {
      errors["credit"] = "NOT SUPPORT NEGATIVE CREDIT";
    } else if (values["credit"] > total_val) {
      errors["credit"] = "CREDIT CAN't EXCEED MORE TOTAL";
    }
  }

  return errors;
}

function mapStateToProps({ form: { inbound_po } }) {
  return { inbound_po };
}

export default reduxForm({
  validate,
  form: "inbound_po",
  destroyOnUnmount: false
})(connect(mapStateToProps, null)(POPayment));
