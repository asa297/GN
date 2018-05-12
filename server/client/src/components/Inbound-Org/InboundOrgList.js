import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInbound_Org } from "../../actions";

class InboundOrgList extends Component {
  componentDidMount() {
    this.props.fetchInbound_Org();
  }

  renderInboundOrg() {
    return this.props.inbound_orgs.reverse().map(inbound_org => {
      return (
        <div className="card darken-1" key={inbound_org._id}>
          <div className="card-content">
            <span className="card-title">
              <b>Org Name :</b>
              <i> {inbound_org.orgName}</i>
              <p className="right">
                Record On :
                {new Date(inbound_org.RecordDate).toLocaleDateString()}
              </p>
            </span>
          </div>
          <div className="card-action">
            <a>Type : {inbound_org.orgTypeName}</a>
            <a>Commission : {inbound_org.orgCom} %</a>
            <a>Org Code : {inbound_org.orgCode} </a>
            <a>RecordBy : {inbound_org.RecordNameBy} </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderInboundOrg()}</div>;
  }
}

function mapStateToProps({ inbound_orgs }) {
  return { inbound_orgs };
}

export default connect(mapStateToProps, { fetchInbound_Org })(InboundOrgList);
