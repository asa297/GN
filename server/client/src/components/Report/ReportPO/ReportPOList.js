import React, { Component } from "react";
import { fetch_ReportPO } from "../../../actions";
import _ from "lodash";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Preloader from "../../utils/Preloader";
import Report_PO_CSS from "../../../Style/CSS/Report_PO_CSS.css";

class ReportPOList extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      show_data: [],
      export_data: []
    };
  }

  componentDidMount() {
    this.props.fetch_ReportPO();
  }

  prepareExportData(value) {
    const {
      index,
      orderId,
      RecordDate_moment,
      orgTypeName,
      groupCode,
      total,
      credit,
      cash,
      RecordNameBy
    } = value;
    return {
      "#": index,
      orderId: `#${orderId}`,
      ReocrdDate: RecordDate_moment,
      orgTypeName,
      groupCode,
      total,
      credit,
      cash,
      RecordNameBy
    };
  }

  componentWillReceiveProps({ reports_po }) {
    if (reports_po) {
      let export_data = [];
      reports_po = _.orderBy(reports_po, "RecordDate", "desc");

      _.map(reports_po, (value, index) => {
        value.RecordDate_moment =
          new Date(value.RecordDate).toLocaleDateString() +
          " " +
          new Date(value.RecordDate).toLocaleTimeString();
        value.index = index;

        const _data = this.prepareExportData(value);
        export_data.push(_data);
      });

      this.setState({
        show_data: reports_po,
        export_data,
        ready: true
      });
    }
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
                    pathname: "/report/reportpo/view",
                    state: { orderId: row.value }
                  }}
                >
                  <i className="tiny material-icons">content_paste</i>
                </Link>
              </div>
            )
          },
          {
            Header: "Order Id",
            accessor: "orderId",
            width: 150,
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

  render() {
    return (
      <div>
        {this.state.ready ? (
          <div>
            <ReactTable
              data={this.state.show_data}
              noDataText="No Data"
              columns={this.settingColumn()}
              className="-striped -highlight"
            />
            <CSVLink
              data={this.state.export_data}
              filename={"purchaseorder.csv"}
            >
              <button className="waves-effect waves-light btn">
                <i className="material-icons left">cloud_download</i>Download
              </button>
            </CSVLink>
          </div>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

function mapStateToProps({ reports_po }) {
  return { reports_po };
}

export default connect(
  mapStateToProps,
  { fetch_ReportPO }
)(ReportPOList);
