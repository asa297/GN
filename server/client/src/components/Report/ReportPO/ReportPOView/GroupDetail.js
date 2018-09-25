import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, change } from "redux-form";
import ReportPOViewField from "./ReportPOViewField";

import ReportPOViewCSS from "./ReportPOView.css";
import Select from "react-select";

class GroupDetail extends Component {
  constructor(props) {
    super(props);
    const { group, org } = props.report_PO;

    const {
      groupId,
      groupCode,
      groupStickerNumber,
      groupRemarks,
      guideName
    } = group;

    const {
      orgId,
      orgName,
      orgTypeId,
      orgTypeName,
      orgCode,
      orgComA,
      orgComB
    } = org;

    this.state = {
      groupId,
      groupCode,
      groupStickerNumber,
      groupRemarks,
      guideName,
      orgId,
      orgName,
      orgTypeId,
      orgTypeName,
      orgCode,
      orgComA,
      orgComB
    };
  }

  componentDidMount() {
    const group_select = _.find(this.props.groups, ({ _id }) => {
      return this.state.groupId === _id;
    });

    if (group_select) {
      group_select.label = `${group_select.groupCode}(${
        group_select.groupStickerNumber
      })`;
      group_select.value = `${group_select.groupCode}(${
        group_select.groupStickerNumber
      })`;

      this.props.dispatch(
        change("report_po_edit", "group_select", group_select)
      );
      this.props.dispatch(
        change("report_po_edit", "group_select.orgComA", this.state.orgComA)
      );
      this.props.dispatch(
        change("report_po_edit", "group_select.orgComB", this.state.orgComB)
      );

      this.props.dispatch(
        change("report_po_edit", "orgComA", this.state.orgComA)
      );
      this.props.dispatch(
        change("report_po_edit", "orgComB", this.state.orgComB)
      );
    }
  }

  renderGroupDetails() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <div style={{ width: "22.5%" }}>
          <label>Group Code</label>
          <input
            value={this.state.groupCode}
            style={{ marginBottom: "25px" }}
            disabled
          />
        </div>
        <div style={{ width: "22.5%" }}>
          <label>Group Sticker Number</label>
          <input
            value={this.state.groupStickerNumber}
            style={{ marginBottom: "25px" }}
            disabled
          />
        </div>
        <div style={{ width: "22.5%" }}>
          <label>Guide Name</label>
          <input
            value={this.state.guideName}
            style={{ marginBottom: "25px" }}
            disabled
          />
        </div>
        <div style={{ width: "22.5%" }}>
          <label>Group Remarks</label>
          <input
            value={this.state.groupRemarks}
            style={{ marginBottom: "25px" }}
            disabled
          />
        </div>
        <div style={{ width: "22.5%" }}>
          <label>Org Name</label>
          <input
            value={this.state.orgName}
            style={{ marginBottom: "25px" }}
            disabled
          />
        </div>
        <div style={{ width: "22.5%" }}>
          <label>Org Code</label>
          <input
            value={this.state.orgCode}
            style={{ marginBottom: "25px" }}
            disabled
          />
        </div>
        <div style={{ width: "22.5%" }}>
          <Field
            key={"orgComA"}
            component={ReportPOViewField}
            type="text"
            label={"orgComA"}
            name={"orgComA"}
            valueField={this.state.orgComA}
            onChange={event => this.OnChangeComA(event.target.value)}
            // onChange={event => this.setState({ orgComA: event.target.value })}
          />
        </div>
        <div style={{ width: "22.5%" }}>
          <Field
            key={"orgComB"}
            component={ReportPOViewField}
            type="text"
            label={"orgComB"}
            name={"orgComB"}
            valueField={this.state.orgComB}
            onChange={event => this.OnChangeComB(event.target.value)}
            // onChange={event => this.setState({ orgComB: event.target.value })}
          />
        </div>
      </div>
    );
  }

  renderGroups() {
    const group_list = _.map(
      this.props.groups,
      ({
        _id,
        groupCode,
        groupStickerNumber,
        groupRemarks,
        guideName,
        orgId,
        orgName,
        orgTypeId,
        orgTypeName,
        orgCode,
        orgComA,
        orgComB
      }) => {
        return {
          _id,
          groupCode,
          groupStickerNumber,
          groupRemarks,
          guideName,
          orgId,
          orgName,
          orgTypeId,
          orgTypeName,
          orgCode,
          orgComA,
          orgComB,
          label: `${groupCode}(${groupStickerNumber})`,
          value: `${groupCode}(${groupStickerNumber})`
        };
      }
    );

    return (
      <div className={ReportPOViewCSS.ReportPOView_GroupDetail}>
        <Field
          name="group_select"
          component={props => (
            <div style={{ width: "100%" }}>
              <label>Groups&nbsp;:&nbsp;</label>
              <div style={{ width: "100%" }}>
                <Select
                  value={props.input.value}
                  options={group_list}
                  onChange={event => {
                    this.onChangeGruopSelect(event);
                  }}
                  placeholder="Select Groups"
                  className="basic-single"
                  simpleValue
                />
              </div>
              <div className="red-text" style={{ marginBottom: "20px" }}>
                {props.meta.touched && props.meta.error}
              </div>
            </div>
          )}
        />
        <div style={{ width: "100%" }}>{this.renderGroupDetails()}</div>
      </div>
    );
  }

  onChangeGruopSelect(values) {
    if (values) {
      const {
        _id,
        groupCode,
        groupStickerNumber,
        groupRemarks,
        guideName,
        orgId,
        orgName,
        orgTypeId,
        orgTypeName,
        orgCode,
        orgComA,
        orgComB
      } = values;

      this.setState({
        groupId: _id,
        groupCode,
        groupStickerNumber,
        groupRemarks,
        guideName,
        orgId,
        orgName,
        orgTypeId,
        orgTypeName,
        orgCode,
        orgComA,
        orgComB
      });

      values.label = `${groupCode}(${groupStickerNumber})`;
      values.value = `${groupCode}(${groupStickerNumber})`;

      this.props.dispatch(change("report_po_edit", "group_select", values));
    }
  }

  OnChangeComA(ComA) {
    this.setState({ orgComA: ComA });
    this.props.dispatch(
      change("report_po_edit", "group_select.orgComA", parseInt(ComA, 10))
    );
  }

  OnChangeComB(ComB) {
    this.setState({ orgComB: ComB });
    this.props.dispatch(
      change("report_po_edit", "group_select.orgComB", parseInt(ComB, 10))
    );
  }

  render() {
    return <div>{this.renderGroups()}</div>;
  }
}

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(mapStateToProps)(GroupDetail);
