import React, { Component } from "react";

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
      Grandtotal,
      OrgCom,
      Com
    } = value;
    return {
      "#": index,
      "Org Name": OrgName,
      Date: new Date(_Date).toLocaleDateString(),
      "Guide Name": GuideName,
      "Group Code": GroupCode,
      "Sticker Number": GroupStickerNumber,
      Amount: numeral(Grandtotal).format("0,0.00"),
      "Org Com": `${OrgCom}%`,
      "Total Com": numeral(Com).format("0,0.00")
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
            Header: "Amount",
            accessor: "Grandtotal",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "center", color: "green", fontWeight: "bold" }
          },
          {
            Header: "Org Com",
            accessor: "OrgCom",

            Cell: row => <div>{`${row.value}%`}</div>,
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Total Com",
            accessor: "Com",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { textAlign: "center", color: "blue", fontWeight: "bold" }
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
            <i className="material-icons left">cloud_download</i>Download
          </button>
        </CSVLink>
      </div>
    );
  }
}

function mapStateToProps({ report_daily_com }) {
  return { report_daily_com };
}

export default connect(mapStateToProps)(List);
