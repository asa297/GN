import React, { Component } from "react";
import Header from "./Component/Main/Header";
import Search from "./Component/Main/Search";
import List from "./Component/Main/List";

class ReportView extends Component {
  render() {
    return (
      <div className="container_report">
        <Header />
        <Search />
        <List />
      </div>
    );
  }
}

export default ReportView;
