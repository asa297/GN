import React, { Component } from "react";
import Alert from "react-s-alert";
import { FindDeliveryNote } from "../../../../actions";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { withRouter } from "react-router-dom";
import CircularLoaderBlue from "../../../utils/CircularLoaderBlue";

const SearchPOField = ({ input, meta: { error, touched } }) => {
  return (
    <div>
      <input {...input} style={{ margin: "0px" }} placeholder="Search DN ID" />
      <div className="red-text"> {touched && error}</div>
    </div>
  );
};

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searching: false
    };
  }

  async SearchDN() {
    this.setState({ searching: true });

    const { DN_Id } = this.props.search_dn.values;
    await this.props.FindDeliveryNote(DN_Id);
    this.setState({ searching: false });

    if (this.props.reports_deliverynote[0]) {
      this.props.history.push({
        pathname: "/report/reportdeliverynote/view",
        state: { DN: this.props.reports_deliverynote[0] }
      });
    } else {
      Alert.error(`The Delivery Note is not found.`, {
        position: "bottom",
        timeout: 2000
      });
    }
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(() => this.SearchDN())}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <div style={{ width: "300px", marginRight: "10px" }}>
            <Field
              key={"DN_Id"}
              component={SearchPOField}
              type="text"
              name={"DN_Id"}
            />
          </div>
          <button className="green btn-flat white-text" type="submit">
            Search
          </button>
          <div style={{ marginLeft: "5px" }}>
            {this.state.searching ? <CircularLoaderBlue /> : null}
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ reports_deliverynote, form: { search_dn } }) {
  return { reports_deliverynote, search_dn };
}

export default reduxForm({
  form: "search_dn"
})(
  connect(
    mapStateToProps,
    { FindDeliveryNote }
  )(withRouter(Search))
);
