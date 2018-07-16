import React from "react";
import { Field } from "redux-form";
import CircularLoaderBlue from "../../utils/CircularLoaderBlue";
import SearchINVSearchField from "./SearchINVSearchField";
import Report_CSS from "../../../Style/CSS/Report_INV_CSS.css";

const SearchINVBar = ({ searching }) => {
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
      <div style={{ marginLeft: "5px" }}>
        {searching ? <CircularLoaderBlue /> : null}
      </div>
    </div>
  );
};

export default SearchINVBar;
