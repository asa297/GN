import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import numeral from "numeral";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import ReactTable from "react-table";
import "react-table/react-table.css";

class List extends Component {
  constructor(props) {
    super(props);
    const { date } = props;
    this.state = {
      filename: date,
      show_data: [],
      export_data: []
    };
  }

  componentDidMount() {
    const { report_daily_com } = this.props;

    let export_data = [];

    _.map(report_daily_com, (value, index) => {
      value.index = index;

      const _data = this.prepareExportData(value);
      export_data.push(_data);
    });

    this.setState({
      show_data: report_daily_com,
      export_data
    });
  }

  prepareExportData(value) {
    const {
      index,
      OrgName,
      Date: _Date,
      GuideName,
      GroupCode,
      GroupStickerNumber,
      totalA,
      totalB,
      discountA,
      discountB,
      grandtotalComA,
      grandtotalComB,
      ComA,
      ComB
    } = value;
    return {
      "#": index,
      "Org Name": OrgName,
      Date: new Date(_Date).toLocaleDateString(),
      "Guide Name": GuideName,
      "Group Code": GroupCode,
      "Sticker Number": GroupStickerNumber,
      "Amount (Item A)": numeral(totalA).format("0,0.00"),
      "Amount (Item B)": numeral(totalB).format("0,0.00"),
      "Discount (Item A)": numeral(discountA).format("0,0.00"),
      "Discount (Item B)": numeral(discountB).format("0,0.00"),
      "Grand Total (Item A)": numeral(grandtotalComA).format("0,0.00"),
      "Grand Total (Item B)": numeral(grandtotalComB).format("0,0.00"),
      "Total Com (Item A)": numeral(ComA).format("0,0.00"),
      "Total Com (Item B)": numeral(ComB).format("0,0.00")
    };
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
            accessor: "GroupId",
            width: 50,
            Cell: row => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {this.props.auth.priority === 1 ? (
                  <Link
                    to={{
                      pathname: "/report/reportdialycom/viewdetail",
                      state: {
                        GroupId: row.value,
                        filename: this.state.filename
                      }
                    }}
                  >
                    <i className="tiny material-icons">content_paste</i>
                  </Link>
                ) : null}
              </div>
            )
          },
          {
            Header: "Org Name",
            accessor: "OrgName",
            width: 300,
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Date",
            accessor: "Date",
            width: 150,
            Cell: row => <div>{new Date(row.value).toLocaleDateString()}</div>,
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Guide Name",
            accessor: "GuideName",
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Group Code",
            accessor: "GroupCode",
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Sticker Number",
            accessor: "GroupStickerNumber",
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Amount (Item A)",
            accessor: "totalA",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "green", fontWeight: "bold" }
          },
          {
            Header: "Amount (Item B)",
            accessor: "totalB",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "green", fontWeight: "bold" }
          },
          {
            Header: "Discount (Item A)",
            accessor: "discountA",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "red", fontWeight: "bold" }
          },
          {
            Header: "Discount (Item B)",
            accessor: "discountB",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "red", fontWeight: "bold" }
          },
          {
            Header: "Grand Total (Item A)",
            accessor: "grandtotalComA",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "blue", fontWeight: "bold" }
          },
          {
            Header: "Grand Total (Item B)",
            accessor: "grandtotalComB",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "blue", fontWeight: "bold" }
          },
          {
            Header: "Total Com (Item A)",
            accessor: "ComA",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "#ff9900", fontWeight: "bold" }
          },
          {
            Header: "Total Com (Item B)",
            accessor: "ComB",
            Cell: row => (
              <div>{`${numeral(row.value).format("0,0.00")} ฿`}</div>
            ),
            style: { textAlign: "center", color: "#ff9900", fontWeight: "bold" }
          }
        ]
      }
    ];
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.state.show_data}
          noDataText="No Data"
          columns={this.settingColumn()}
          className="-striped -highlight"
        />
        <CSVLink
          data={this.state.export_data}
          filename={`daily-com-${this.state.filename}.csv`}
        >
          <button className="waves-effect waves-light btn">
            <i className="material-icons left">cloud_download</i>
            Download
          </button>
        </CSVLink>
      </div>
    );
  }
}

function mapStateToProps({ report_daily_com, auth }) {
  return { report_daily_com, auth };
}

export default connect(mapStateToProps)(List);
