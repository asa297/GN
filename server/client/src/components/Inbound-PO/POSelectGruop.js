import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
import { fetchInbound_Group } from "../../actions";

import Select from "react-select";

import PO_CSS from "../../Style/CSS/PO_CSS.css";
import PreLoader from "../utils/Preloader";

class POSelectGruop extends Component {
  constructor() {
    super();
    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    this.props.dispatch(reset("inbound_po"));
    this.props.fetchInbound_Group();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inbound_groups && this.state.ready === false) {
      this.setState({ ready: true });
    }
  }

  renderGroupFieldSelect() {
    const group_list = _.map(
      this.props.inbound_groups,
      ({
        _id,
        orgId,
        groupCode,
        orgTypeId,
        orgTypeName,
        orgCom,
        orgName,
        guideName
      }) => {
        return {
          _id,
          groupCode,
          orgName,
          orgCom,
          orgTypeId,
          orgTypeName,
          guideName,
          label: groupCode,
          value: groupCode
        };
      }
    );
    return (
      <div>
        <Field
          name="group_select"
          component={props => (
            <div style={{ width: "500px" }}>
              <Select
                value={props.input.value}
                options={group_list}
                onChange={props.input.onChange}
                placeholder={props.meta.touched && props.meta.error}
                className="form-control"
                simpleValue
              />
            </div>
          )}
        />
      </div>
    );
  }

  renderContent() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <div className={PO_CSS.container_top}>
          <h3 className="center">
            <i>Step #1 -</i> Group Selection
          </h3>
          <div className={PO_CSS.flex_center}>
            {this.renderGroupFieldSelect()}
          </div>
          <div className="center">
            <button
              className="green btn-flat white-text"
              style={{ marginTop: "30px" }}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.state.ready ? this.renderContent() : <PreLoader />}
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values["group_select"]) {
    errors["group_select"] = "Require a value ";
  }
  return errors;
}

function mapStateToProps({ inbound_groups }) {
  return { inbound_groups };
}

export default reduxForm({
  validate,
  form: "inbound_po",
  destroyOnUnmount: false
})(
  connect(
    mapStateToProps,
    { fetchInbound_Group }
  )(POSelectGruop)
);
