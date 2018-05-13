import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInbound_Org } from "../../actions";

class InboundOrgList extends Component {
  componentDidMount() {
    this.props.fetchInbound_Org();
  }

  renderInboundOrg() {
    return this.props.inbound_orgs.map(
      (
        {
          _id,
          orgName,
          RecordDate,
          orgTypeName,
          orgCom,
          orgCode,
          RecordNameBy
        },
        index
      ) => {
        return (
          <div
            className="card darken-1"
            key={_id}
            onClick={() => this.props.onclick(index, _id)}
          >
            <div className="card-content">
              <span className="card-title">
                <b>Org Name :</b>
                <i> {orgName}</i>
                <p className="right">
                  Last Record On :
                  {new Date(RecordDate).toLocaleDateString()}
                </p>
              </span>
            </div>
            <div className="card-action">
              <a>Type : {orgTypeName}</a>
              <a>Commission : {orgCom} %</a>
              <a>Org Code : {orgCode} </a>
              <a>RecordBy : {RecordNameBy} </a>
            </div>
          </div>
        );
      }
    );
  }

  render() {
    return <div>{this.renderInboundOrg()}</div>;
  }
}

function mapStateToProps({ inbound_orgs, typeorgs }) {
  return { inbound_orgs, typeorgs };
}

export default connect(mapStateToProps, { fetchInbound_Org })(InboundOrgList);
