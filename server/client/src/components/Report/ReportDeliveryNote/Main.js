import React, { Component } from "react";
import Header from "./MainComponent/Header";
import List from "./MainComponent/List";
import Search from "./MainComponent/Search";

class Main extends Component {
  render() {
    return (
      <div
        style={{
          marginLeft: "5%",
          marginRight: " 5%"
        }}
      >
        <Header />
        <Search />
        <List />
      </div>
    );
  }
}

export default Main;
