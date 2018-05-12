import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Select from "react-select";

import { fetchInbound_Org, fetchOrgType } from "../../actions";
import InboundOrgField from "./InboundOrgField";
import FIELDS from "./formFields";

class InboundOrgEdit extends Component {
  constructor(props) {
    super(props);
    const value_props = this.props.inbound_orgs[this.props.index];
    this.state = {
      _id: value_props._id,
      orgName: value_props.orgName,
      orgCom: value_props.orgCom,
      orgCode: value_props.orgCode
    };
  }

  //   componentDidMount() {
  //     this.props.fetchInbound_Org();
  //     this.props.fetchOrgType();
  //   }

  renderField() {
    return _.map(FIELDS, ({ label, name, key }) => {
      return (
        <Field
          key={name}
          component={InboundOrgField}
          type="text"
          label={label}
          name={name}
          valueField={this.state[key]}
          onChange={event =>
            this.setState(
              { [key]: event.target.value },
              console.log(this.state)
            )
          }
        />
      );
    });
  }

  //   renderFieldOrgType() {
  //     const orgType_list = _.map(
  //       this.props.typeorgs,
  //       ({ _id, org_typeId, org_typeName }) => {
  //         return {
  //           org_Id: _id,
  //           org_typeId: org_typeId,
  //           org_typeName: org_typeName,
  //           label: org_typeName
  //         };
  //       }
  //     );

  //     return (
  //       <div>
  //         <label>Organization Type</label>

  //         <Field
  //           name="org_type"
  //           component={props => (
  //             <div>
  //               <Select
  //                 value={props.input.value}
  //                 options={orgType_list}
  //                 onChange={props.input.onChange}
  //                 placeholder={props.meta.touched && props.meta.error}
  //                 className="form-control"
  //                 simpleValue
  //               />
  //             </div>
  //           )}
  //         />
  //       </div>
  //     );
  //   }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(() => console.log("gg"))}>
          {/* {this.renderFieldOrgType()} */}
          {this.renderField()}

          <button
            onClick={this.props.onCancal}
            className="red btn-flat white-text"
          >
            Cancal
          </button>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values["org_type"]) {
    errors["org_type"] = "Require a value";
  }

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Require a value";
    }
  });

  return errors;
}

function mapStateToProps({ inbound_orgs, typeorgs }) {
  return { inbound_orgs, typeorgs };
}

export default reduxForm({
  validate,
  form: "inbound_org",
  destroyOnUnmount: false
})(
  connect(mapStateToProps, { fetchInbound_Org, fetchOrgType })(InboundOrgEdit)
);
