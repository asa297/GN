import React from "react";
import { Field } from "redux-form";
import SearchPOField from "./SearchPOField";
import Report_CSS from "../../../Style/CSS/Report_PO_CSS.css";
import CircularLoaderBlue from "../../utils/CircularLoaderBlue";

const SearchPOBar = ({ searching }) => {
  return (
    <div className={Report_CSS.searchbar}>
      <div style={{ width: "300px", marginRight: "10px" }}>
        <Field
          key={"orderId"}
          component={SearchPOField}
          type="text"
          name={"orderId"}
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

export default SearchPOBar;
