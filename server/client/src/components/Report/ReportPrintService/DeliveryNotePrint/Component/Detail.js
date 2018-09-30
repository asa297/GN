import React, { Component } from "react";

const DetailComponent = ({ icon, value, title, style, marginBottom }) => {
  return (
    <div style={style}>
      <div
        className="input-field col s12 m12"
        style={{ marginBottom: marginBottom }}
      >
        <i className="material-icons prefix">{icon}</i>
        <input value={value} id="first_name2" type="text" disabled />
        <label className="active" htmlFor="first_name2">
          <b>{title}</b>
        </label>
      </div>
    </div>
  );
};

class Detail extends Component {
  constructor(props) {
    super(props);

    const {
      branch_origin,
      branch_destination,
      DN_StatusName,
      DN_Remark
    } = props.print_value;

    this.state = {
      branch_origin,
      branch_destination,
      DN_StatusName,
      DN_Remark
    };
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <DetailComponent
            icon="business"
            value={this.state.branch_origin.branch_Name || ""}
            title="Origin Branch"
            style={{ width: "35%", margin: "0px" }}
            marginBottom="0px"
          />
          <DetailComponent
            icon="airport_shuttle"
            value={this.state.branch_destination.branch_Name || ""}
            title="Destination Branch"
            style={{ width: "35%", margin: "0px" }}
            marginBottom="0px"
          />
          <DetailComponent
            icon="content_paste"
            value={this.state.DN_StatusName || ""}
            title="Status"
            style={{ width: "30%", margin: "0px" }}
            marginBottom="0px"
          />
        </div>
        <DetailComponent
          icon="event_note"
          value={this.state.DN_Remark || ""}
          title="Document Note"
          style={{ width: "100%", margin: "0px" }}
        />
      </div>
    );
  }
}

export default Detail;
