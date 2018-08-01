import React, { Component } from "react";

import _ from "lodash";
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
    const { reports_daily_cashbalance } = this.props;

    let export_data = [];

    _.map(reports_daily_cashbalance, (value, index) => {
      value.index = index;

      const _data = this.prepareExportData(value);
      export_data.push(_data);
    });

    this.setState({
      show_data: reports_daily_cashbalance,
      export_data
    });
  }

  prepareExportData(value) {
    const { index, RecordNameBy, Receivecash, Grandtotal, Changecash } = value;
    return {
      "#": index,
      "Cashier Name": RecordNameBy,
      "Receive Cash": Receivecash,
      "Grand Total": Grandtotal,
      Change: Changecash
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
            Header: "Cashier Name",
            accessor: "RecordNameBy",
            width: 500,
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Receivecash",
            accessor: "Receivecash",
            style: { textAlign: "center", color: "green", fontWeight: "bold" }
          },
          {
            Header: "Grandtotal",
            accessor: "Grandtotal",
            style: { textAlign: "center", color: "blue", fontWeight: "bold" }
          },
          {
            Header: "Change",
            accessor: "Changecash",
            style: { textAlign: "center", color: "red", fontWeight: "bold" }
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
          filename={`daily-cash-balance-${this.state.filename}.csv`}
        >
          <button className="waves-effect waves-light btn">
            <i className="material-icons left">cloud_download</i>Download
          </button>
        </CSVLink>
      </div>
    );
  }
}

function mapStateToProps({ reports_daily_cashbalance }) {
  return { reports_daily_cashbalance };
}

export default connect(mapStateToProps)(List);
