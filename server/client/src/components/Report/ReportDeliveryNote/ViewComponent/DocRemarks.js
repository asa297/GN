import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";

const FieldComponent = ({
  input,
  label,
  setValue,
  meta: { error, touched }
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        style={{ marginBottom: "5px" }}
        value={setValue}
        disabled
      />
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

  handleRemarkChange(value) {
    this.setState({ DN_Remark: value });
  }

  render() {
    return (
      <div>
        <Field
          label="Document Remarks"
          name="DN_Remark"
          key="DN_Remark"
          setValue={this.state.DN_Remark}
          component={FieldComponent}
          onChange={event => this.handleRemarkChange(event.target.value)}
          type="text"
        />
      </div>
    );
  }
}

export default reduxForm({
  form: "dn_form_edit"
})(DocRemarks);
