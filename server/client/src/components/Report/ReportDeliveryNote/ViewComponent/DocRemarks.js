import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";

const FieldComponent = ({ input, label, meta: { error, touched }, value }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} value={value} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

class DocRemarks extends Component {
  constructor(props) {
    super(props);
    const { DN_Remark } = props;
    this.state = {
      DN_Remark
    };
  }

  componentDidMount() {
    this.props.dispatch(
      change("dn_form_edit", "DN_Remark", this.state.DN_Remark)
    );
  }

  render() {
    return (
      <div>
        <Field
          label="Document Remarks"
          name="doc_remarks"
          key="doc_remarks"
          value={this.state.DN_Remark}
          component={FieldComponent}
          type="text"
        />
      </div>
    );
  }
}

export default reduxForm({
  form: "dn_form_edit"
})(DocRemarks);
