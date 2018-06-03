import React from "react";
import { Field } from "redux-form";
import SearchINVSearchField from "./SearchINVSearchField";
import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";

const SearchINVBar = () => {
  return (
    <div className={Report_CSS.searchbar}>
      <div style={{ width: "300px", marginRight: "10px" }}>
        <Field
          key={"item_code"}
          component={SearchINVSearchField}
          type="text"
          name={"item_code"}
        />
      </div>
      <button className="green btn-flat white-text" type="submit">
        Search
      </button>
    </div>
  );
};

export default SearchINVBar;
