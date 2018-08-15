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
import numeral from "numeral";

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
      org,
      group,
      total,
      discount,
      credit,
      creditcharge,
      grandtotal,
      receivecash,
      changecash,
      RecordNameBy
    } = value;

    return {
      "#": index,
      OrderId: `#${orderId}`,
      ReocrdDate: RecordDate_moment,
      OrgName: org.orgName,
      OrgTypeName: org.orgTypeName,
      GroupCode: group.groupCode,
      StickerNumber: group.groupStickerNumber,
      Total: numeral(total).format("0,0"),
      Discount: `${numeral(discount).format("0,0")}`,
      Credit: numeral(credit).format("0,0"),
      Creditcharge: numeral(creditcharge).format("0,0"),
      Grandtotal: numeral(grandtotal).format("0,0"),
      Receivecash: numeral(receivecash).format("0,0"),
      Changecash: numeral(changecash).format("0,0"),
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
            accessor: "org.orgName",
            width: 350,
            style: { textAlign: "center" }
          },
          {
            Header: "Org Type",
            accessor: "org.orgTypeName",
            width: 100
          },
          {
            Header: "GroupCode",
            accessor: "group.groupCode",
            style: { textAlign: "center" }
          },
          {
            Header: "Sticker Number",
            accessor: "group.groupStickerNumber",
            style: { textAlign: "center" }
          },
          {
            Header: "Total",
            accessor: "total",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "right" }
          },
          {
            Header: "Discount",
            accessor: "discount",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "right" }
          },
          {
            Header: "Credit",
            accessor: "credit",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "right" }
          },
          {
            Header: "Credit Charge",
            accessor: "creditcharge",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "right" }
          },
          {
            Header: "Grand Total",
            accessor: "grandtotal",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "right", fontWeight: "bold", color: "blue" }
          },
          {
            Header: "Receive Cash",
            accessor: "receivecash",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "right", fontWeight: "bold", color: "green" }
          },
          {
            Header: "Change Cash",
            accessor: "changecash",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "right", fontWeight: "bold", color: "red" }
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
              filename={"#101-purchaseorder.csv"}
            >
              <button className="waves-effect waves-light btn">
                <i className="material-icons left">cloud_download</i>
                Download
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
