import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { CSVLink } from "react-csv";
import { FetchDeliveryNote } from "../../../../actions";
import Preloader from "../../../utils/Preloader";

class List extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      show_data: [],
      export_data: []
    };
  }

  componentDidMount() {
    this.props.FetchDeliveryNote();
  }

  prepareExportData(value) {
    const {
      index,
      DN_Id,
      RecordDate_moment,
      branch_origin,
      branch_destination,
      DN_StatusName,
      RecordNameBy
    } = value;

    return {
      "#": index,
      DN_Id: `#${DN_Id}`,
      ReocrdDate: RecordDate_moment,
      BranchOrigin: branch_origin.branch_Name,
      BranchDestination: branch_destination.branch_Name,
      DN_Status: DN_StatusName,
      RecordNameBy
    };
  }

  componentWillReceiveProps({ reports_deliverynote }) {
    if (reports_deliverynote) {
      let export_data = [];
      reports_deliverynote = _.orderBy(
        reports_deliverynote,
        "RecordDate",
        "desc"
      );

      _.map(reports_deliverynote, (value, index) => {
        value.RecordDate_moment =
          new Date(value.RecordDate).toLocaleDateString() +
          " " +
          new Date(value.RecordDate).toLocaleTimeString();
        value.index = index;

        const _data = this.prepareExportData(value);
        export_data.push(_data);
      });

      this.setState({
        show_data: reports_deliverynote,
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
            width: 50,
            Cell: cellInfo => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={{
                    pathname: "/report/reportdeliverynote/view",
                    state: { DN: cellInfo.original }
                  }}
                >
                  <i className="tiny material-icons">content_paste</i>
                </Link>
              </div>
            )
          },
          {
            Header: "DN Id",
            accessor: "DN_Id",
            width: 150,
            style: { fontWeight: "bold" }
          },
          {
            Header: "Date",
            accessor: "RecordDate_moment",
            width: 200,
            style: { textAlign: "center" }
          },
          {
            Header: "Branch Origin",
            accessor: "branch_origin.branch_Name",
            style: { textAlign: "center" }
          },
          {
            Header: "Branch Destination",
            accessor: "branch_destination.branch_Name",
            style: { textAlign: "center" }
          },
          {
            Header: "Status",
            accessor: "DN_StatusName",
            width: 100,
            style: { textAlign: "center", fontWeight: "bold" }
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
              filename={"#205-deliverynote.csv"}
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

function mapStateToProps({ reports_deliverynote }) {
  return { reports_deliverynote };
}

export default connect(
  mapStateToProps,
  { FetchDeliveryNote }
)(List);
