import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field } from "redux-form";
import Select from "react-select";
import PO_CSS from "../../Style/CSS/PO_CSS.css";

class POSelectGruop extends Component {
  renderGroupFieldSelect() {
    const group_list = _.map(
      this.props.groups,
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
      <Field
        name="group_select"
        component={props => (
          <div>
            <div className={PO_CSS.POSelectGruop}>
              <label>Group&nbsp;:&nbsp;</label>
              <div style={{ width: "100%" }}>
                <Select
                  value={props.input.value}
                  options={group_list}
                  onChange={props.input.onChange}
                  placeholder="Select Group"
                  className="basic-single"
                  simpleValue
                />
              </div>
            </div>

            <div className="red-text" style={{ marginBottom: "20px" }}>
              {props.meta.touched && props.meta.error}
            </div>
          </div>
        )}
      />
    );
  }

  renderContent() {
    return <div>{this.renderGroupFieldSelect()}</div>;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(mapStateToProps)(POSelectGruop);
