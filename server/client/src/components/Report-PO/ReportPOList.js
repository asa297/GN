import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchInbound_ReportPO } from "../../actions";

import moment from "moment";

import ReactTable from "react-table";
import "react-table/react-table.css";

import ColumnReportPO from "../../utils/ColumnReportPO";

class ReportPOList extends Component {
  componentDidMount() {
    this.props.fetchInbound_ReportPO();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inbound_reports_po) {
      _.map(nextProps.inbound_reports_po, (value, index) => {
        value.RecordDate_moment = moment(value.RecordDate).format("YYYY-MM-DD");
        value.index = index;
      });
    }
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.inbound_reports_po}
          noDataText="Oh Noes!"
          columns={ColumnReportPO}
          defaultPageSize={15}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

function mapStateToProps({ inbound_reports_po }) {
  return { inbound_reports_po: _.reverse(inbound_reports_po) };
}

export default connect(mapStateToProps, { fetchInbound_ReportPO })(
  ReportPOList
);
