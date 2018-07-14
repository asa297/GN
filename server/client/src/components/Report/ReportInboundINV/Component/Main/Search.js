import React, { Component } from "react";

import Inbound from "./Search/Inbound";
import SearchDatePicker from "./Search/SearchDatePicker";

class Search extends Component {
  render() {
    return (
      <div className="container_search">
        <div>
          <Inbound />
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
