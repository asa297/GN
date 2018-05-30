import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Link } from "react-router-dom";

import "react-table/react-table.css";

import { fetchInbound_ReportPO } from "../../../actions";
import ColumnReportPO from "../../../utils/ColumnReportPO";
import Report_PO_CSS from "../../../Style/CSS/Report_PO_CSS.css";

class ReportPOList extends Component {
  componentDidMount() {
    this.props.fetchInbound_ReportPO();
  }

  viewPO(orderId) {
    console.log(orderId);
  }

  settingColumn() {
    return [
      {
        columns: [
          {
            Header: "#",
            accessor: "index",
            width: 30,
            style: { textAlign: "center" }
          },
          {
            accessor: "orderId",
            width: 50,
            Cell: row => (
              <div className={Report_PO_CSS.viewReportPO}>
                <Link
                  to={{
                    pathname: "/reportpo/view",
                    state: { orderId: row.value }
                  }}
                >
                  <i
                    className="tiny material-icons"
                    // onClick={() => this.viewPO(row.value)}
                  >
                    content_paste
                  </i>
                </Link>
              </div>
            )
          },
          {
            Header: "Order Id",
            accessor: "orderId",
            style: { fontWeight: "bold" }
          },
          {
            Header: "Date",
            accessor: "RecordDate_moment",
            style: { textAlign: "center" }
          },
          {
            Header: "Org Name",
            accessor: "orgName",
            width: 500
          },
          {
            Header: "Org Type",
            accessor: "orgTypeName",
            width: 100
          },
          {
            Header: "GroupCode",
            accessor: "groupCode",
            style: { textAlign: "center" }
          },
          {
            Header: "Total",
            accessor: "grandtotal",
            style: { textAlign: "right", fontWeight: "bold" }
          },
          {
            Header: "Credit",
            accessor: "credit",
            style: { textAlign: "right" }
          },
          {
            Header: "Cash",
            accessor: "cash",
            style: { textAlign: "right" }
          },
          {
            Header: "RecordBy",
            accessor: "RecordNameBy",
            style: { textAlign: "center" }
          }
        ]
      }
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inbound_reports_po) {
      _.map(nextProps.inbound_reports_po, (value, index) => {
        value.RecordDate_moment = new Date(
          value.RecordDate
        ).toLocaleDateString();
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
          columns={this.settingColumn()}
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
