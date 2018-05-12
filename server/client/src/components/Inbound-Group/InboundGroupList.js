import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInbound_Group } from "../../actions";

class InboundGroupList extends Component {
  componentDidMount() {
    this.props.fetchInbound_Group();
  }

  renderInboundGroup() {
    return this.props.inbound_groups.reverse().map(inbound_group => {
      return (
        <div className="card darken-1" key={inbound_group._id}>
          <div className="card-content">
            <span className="card-title">
              <b>Group Code : </b>
              <i>
                {inbound_group.groupCode} ({inbound_group.groupRemarks})
              </i>
              <p className="right">
                Record On :
                {new Date(inbound_group.RecordDate).toLocaleDateString()}
              </p>
            </span>
          </div>
          <div className="card-action">
            <a>Org Code : {inbound_group.orgCode} </a>
            <a>Org Name : {inbound_group.orgName} </a>
            <a>Guide Name : {inbound_group.guideName} </a>
            <a>RecordBy : {inbound_group.RecordNameBy} </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderInboundGroup()}</div>;
  }
}

function mapStateToProps({ inbound_groups }) {
  return { inbound_groups };
}

export default connect(mapStateToProps, { fetchInbound_Group })(
  InboundGroupList
);
