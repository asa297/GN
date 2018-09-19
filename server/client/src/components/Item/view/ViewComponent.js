import React, { Component } from "react";

class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "",
      value: "",
      title: ""
    };
  }

  componentDidMount() {
    const { icon, value, title } = this.props;
    this.setState({ icon, value, title });
  }

  render() {
    return (
      <div className="row" style={{ margin: "0px" }}>
        <div className="input-field col s12 m12">
          <i className="material-icons prefix">{this.state.icon}</i>
          <input
            value={this.state.value || ""}
            id="first_name2"
            type="text"
            disabled
          />
          <label className="active" htmlFor="first_name2">
            <b>{this.state.title}</b>
          </label>
        </div>
      </div>
    );
  }
}

export default ViewComponent;
