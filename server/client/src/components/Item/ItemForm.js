import React, { Component } from "react";
import _ from "lodash";
import { reduxForm, Field, reset, change } from "redux-form";

import { Link } from "react-router-dom";

import ItemField from "./ItemField";
import FIELDS from "./formFields";
import itemType_list from "../../utils/ItemTypeLIst";

import Select from "react-select";
import FileBase64 from "react-file-base64";

class ItemForm extends Component {
  constructor() {
    super();
    this.state = {
      base64: null
    };
  }
  componentDidMount() {
    this.props.dispatch(reset("item_form"));
  }

  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={ItemField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  renderFieldItemType() {
    return (
      <div>
        <label>Item Type</label>

        <Field
          name="item_type"
          component={props => (
            <div>
              <Select
                value={props.input.value}
                options={itemType_list}
                onChange={props.input.onChange}
                placeholder={props.meta.touched && props.meta.error}
                className="basic-single"
                simpleValue
              />
            </div>
          )}
        />
      </div>
    );
  }

  getFiles(files) {
    const { file } = files;

    var reader = new FileReader();
    reader.onload = e => {
      var img = document.createElement("img");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 300;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        // var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataurl = canvas.toDataURL("image/png");

        this.setState({ img_base64: dataurl });
        this.props.dispatch(change("item_form", "image", dataurl));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="container" style={{ marginTop: " 10px" }}>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: "400px", height: "300px" }}
              src={this.state.img_base64}
              alt="des"
            />
          </div>
          <div>
            <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
          </div>

          {this.renderField()}
          {this.renderFieldItemType()}

          <Link to="/Item" className="red btn-flat white-text">
            Cancal
          </Link>
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

  if (!values["item_type"]) {
    errors["item_type"] = "Require a value";
  }

  _.each(FIELDS, ({ name }) => {
    if (
      !values[name] &&
      // name !== "item_qty" &&
      name !== "item_factory" &&
      name !== "item_color" &&
      name !== "item_skin" &&
      name !== "item_remarks"
    ) {
      errors[name] = "Require a value";
    }

    if (values["item_price"] && isNaN(values["item_price"])) {
      errors["item_price"] = "Require a number only";
    } else {
      if (values["item_price"] < 0) {
        errors["item_price"] = "NOT SUPPORT NEGATIVE PRICE";
      }
    }

    // if (values["item_qty"] && isNaN(values["item_qty"])) {
    //   errors["item_qty"] = "Require a number only";
    // } else {
    //   if (values["item_qty"] < 0) {
    //     errors["item_qty"] = "NOT SUPPORT NEGATIVE QTY";
    //   }
    // }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "item_form",
  destroyOnUnmount: false
})(ItemForm);
