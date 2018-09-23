import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

const FieldComponent = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

class DocRemarks extends Component {
  render() {
    return (
      <div>
        <Field
          label="Document Remarks"
          name="DN_Remark"
          key="DN_Remark"
          component={FieldComponent}
          type="text"
        />
      </div>
    );
  }
}

export default reduxForm({
  form: "dn_form"
})(DocRemarks);
