import React, { Component } from "react";

import Outbound from "./Search/Outbound";
import SearchDatePicker from "./Search/SearchDatePicker";

class Search extends Component {
  render() {
    return (
      <div className="container_search">
        <div>
          <Outbound />
        </div>
        <div />
        <div>
          <SearchDatePicker />
        </div>
      </div>
    );
  }
}

export default Search;
