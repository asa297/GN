import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm, Field, change, reset } from "redux-form";
import Select from "react-select";
import FileBase64 from "react-file-base64";

import ItemField from "./ItemField";
import FIELDS from "./formFields";

import itemType_list from "../../utils/ItemTypeLIst";

class ItemEdit extends Component {
  constructor(props) {
    super(props);

    const value_props = this.props.items[
      _.findIndex(this.props.items, { _id: this.props._id })
    ];

    const {
      _id,
      item_code,
      item_name,
      item_price,
      item_qty,
      image
    } = value_props;

    const itemType_selected = _.find(itemType_list, ({ itemTypeId }) => {
      return itemTypeId === value_props.itemTypeId;
    });

    this.state = {
      _id,
      item_code,
      item_name,
      item_price,
      item_qty,
      itemType_selected,
      itemTypeId: itemType_selected.itemTypeId,
      image
    };
  }

  componentDidMount() {
    this.props.dispatch(reset("item_form"));

    _.map(FIELDS, ({ name, key }) => {
      this.props.dispatch(change("item_form", name, this.state[name]));
    });
    this.props.dispatch(
      change("item_form", "item_type", this.state.itemType_selected)
    );
    this.props.dispatch(change("item_form", "image", this.state.image));
  }

  renderField() {
    return _.map(FIELDS, ({ label, name, disabled }) => {
      return (
        <Field
          value={this.state[name]}
          disabled={disabled}
          key={name}
          component={ItemField}
          type="text"
          label={label}
          name={name}
          valueField={this.state[name]}
          onChange={event => this.setState({ [name]: event.target.value })}
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
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataurl = canvas.toDataURL("image/png");

        this.setState({ image: dataurl });
        this.props.dispatch(change("item_form", "image", dataurl));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  renderContent() {
    return (
      <div style={{ marginTop: " 10px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ width: "400px", height: "300px" }}
            src={this.state.image}
          />
        </div>
        <div>
          <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
        </div>

        {this.renderFieldItemType()}
        {this.renderField()}
        <button
          onClick={this.props.onCancal}
          className="red btn-flat white-text"
        >
          <i className="material-icons left">chevron_left</i>
          Back
        </button>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">chevron_right</i>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderContent()}
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
      name !== "item_qty" &&
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

    if (values["item_qty"] && isNaN(values["item_qty"])) {
      errors["item_qty"] = "Require a number only";
    } else {
      if (values["item_qty"] < 0) {
        errors["item_qty"] = "NOT SUPPORT NEGATIVE QTY";
      } else if (values["item_qty"] === 0) {
        errors["item_qty"] = "Require a Quantity";
      }
    }
  });

  return errors;
}

function mapStateToProps({ items }) {
  return { items };
}

export default reduxForm({
  validate,
  form: "item_form",
  destroyOnUnmount: false
})(connect(mapStateToProps)(ItemEdit));
