import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Toggle from "react-toggle";
import { reduxForm, Field } from "redux-form";

import POItemField from "./POItemField";
import formFields from "./formFields";

class POPayment extends Component {
  constructor(props) {
    super(props);

    const { orgTypeId } = this.props.inbound_po.values.group_select;

    this.state = {
      orgTypeId,
      itemList: [],
      creditToggle: false,
      creditChargeStatus: false,
      creditCharge: 0,
      discount: 0,
      credit: 0
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
    if (nextProps.inbound_po.values.itemList) {
      this.setState({ itemList: nextProps.inbound_po.values.itemList });
    }
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
    let total = 0;

    _.map(this.state.itemList, ({ item_price, countQty }) => {
      total = total + item_price * countQty;
    });

    if (creditToggle && creditChargeStatus) {
      const charge = 1 + creditCharge / 100;
      total = total * charge;
    }

    if (DC !== 0 && DC > 0 && DC <= 100) {
      const dis = (100 - DC) / 100;
      total = total * dis;
    }

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
        {this.renderFieldDC()}
        {this.renderToggle()}
        {this.state.creditToggle ? this.renderFieldCredit() : null}
        <div>{this.renderSum()}</div>
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
    }

    // else if (values["credit"] > check_credit) {
    //   console.log(values["credit"], check_credit);
    //   errors["credit"] = "CREDIT CAN't EXCEED MORE TOTAL";
    // }
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
