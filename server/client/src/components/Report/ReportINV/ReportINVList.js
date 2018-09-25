import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import numeral from "numeral";

import "react-table/react-table.css";

import { fetch_Item } from "../../../actions";
import Preloader from "../../utils/Preloader";
import Report_INV_CSS from "../../../Style/CSS/Report_INV_CSS.css";

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
    this.props.fetch_Item();
  }

  prepareExportData(value) {
    const {
      index,
      item_factory,
      item_code,
      item_name,
      item_price,
      item_remarks,
      item_skin,
      item_color,
      item_qty_PTY,
      itemTypeName,
      LastModifyDate_moment,
      LastModifyByName
    } = value;
    return {
      "#": index,
      item_factory,
      item_code: `#${item_code}`,
      item_name,
      item_price,
      item_remarks,
      item_skin,
      item_color,
      item_qty_PTY,
      itemTypeName,
      Date: LastModifyDate_moment,
      LastModifyByName
    };
  }

  componentWillReceiveProps({ items }) {
    if (items) {
      let export_data = [];
      items = _.orderBy(items, "item_code", "asc");

      _.map(items, (value, index) => {
        value.LastModifyDate_moment =
          new Date(value.LastModifyDate).toLocaleDateString() +
          " " +
          new Date(value.LastModifyDate).toLocaleTimeString();

        value.index = index;

        const _data = this.prepareExportData(value);
        export_data.push(_data);
      });

      this.setState({
        show_data: items,
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
            Header: "",
            accessor: "_id",
            width: 50,
            Cell: row => (
              <div className={Report_INV_CSS.viewReportINV}>
                <Link
                  to={{
                    pathname: "/report/reportinv/view",
                    state: { _id: row.value }
                  }}
                >
                  <i className="tiny material-icons">content_paste</i>
                </Link>
              </div>
            )
          },
          {
            Header: "F.P.",
            accessor: "item_factory",
            style: { textAlign: "center" },
            width: 100
          },
          {
            Header: "Item Code",
            accessor: "item_code",
            style: { fontWeight: "bold", textAlign: "center" }
          },
          {
            Header: "Item Name",
            accessor: "item_name",
            style: { textAlign: "center" },
            width: 300
          },
          {
            Header: "Price",
            accessor: "item_price",
            Cell: row => <div>{numeral(row.value).format("0,0.00")}</div>,
            style: { fontWeight: "bold", textAlign: "right", color: "green" }
          },
          {
            Header: "Remarks",
            accessor: "item_remarks",
            style: { textAlign: "center", fontWeight: "lighter" },
            width: 300
          },
          {
            Header: "Skin",
            accessor: "item_skin",
            style: { textAlign: "center", fontWeight: "lighter" }
          },
          {
            Header: "Color",
            accessor: "item_color",
            style: { textAlign: "center", fontWeight: "lighter" }
          },
          {
            Header: "QTY",
            accessor: "item_qty_PTY",
            width: 100,
            style: { textAlign: "right" }
          },
          {
            Header: "Item Grade",
            accessor: "itemTypeName",
            style: { textAlign: "center", fontWeight: "lighter" }
          },
          {
            Header: "Date",
            accessor: "LastModifyDate_moment",
            style: { textAlign: "center" }
          },
          {
            Header: "LastModifyByName",
            accessor: "LastModifyByName",
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
            <CSVLink data={this.state.export_data} filename={"inventory.csv"}>
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

function mapStateToProps({ items }) {
  return { items };
}

export default connect(
  mapStateToProps,
  { fetch_Item }
)(ReportPOList);
