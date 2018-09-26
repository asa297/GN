import React, { Component } from "react";
import Alert from "react-s-alert";
import { find_Item } from "../../../../../../actions";
import CircularLoaderBlue from "../../../../../utils/CircularLoaderBlue";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { required, whitespace } from "../../../../../utils/validation";

const OutboundItemField = ({ input, meta: { error, touched } }) => {
  return (
    <div>
      <input
        {...input}
        style={{ marginBottom: "0px" }}
        placeholder="outbound item"
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

class Outbound extends Component {
  constructor() {
    super();

    this.state = {
      ready: true
    };
  }

  async handleSearchSubmit() {
    const { item_code } = this.props.report_outbound_inv.values;
    this.setState({ ready: false });
    await this.props.find_Item(item_code);
    this.setState({ ready: true });
    if (this.props.items) {
      this.props.history.push({
        pathname: "/report/reportoutboundinv/view/edit",
        state: { item_code }
      });
    } else {
      Alert.error(`Item Not Found.`, {
        position: "bottom",
        timeout: 2000
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(() => this.handleSearchSubmit())}>
        <div className="search_inboundINV">
          <Field
            name="item_code"
            component={OutboundItemField}
            validate={[required, whitespace]}
          />
          <button
            type="submit"
            className="green btn-flat white-text"
            style={{ marginLeft: "10px" }}
          >
            Search
          </button>
          {this.state.ready ? null : (
            <div style={{ marginLeft: "5px" }}>
              <CircularLoaderBlue />
            </div>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps({ form: { report_outbound_inv }, items }) {
  return { report_outbound_inv, items };
}

export default reduxForm({
  form: "report_outbound_inv"
})(
  connect(
    mapStateToProps,
    {
      find_Item
    }
  )(withRouter(Outbound))
);
