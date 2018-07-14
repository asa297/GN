import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgTypeReducer from "./orgTypeReducer";
import orgReducer from "./orgReducer";
import groupReducer from "./groupReducer";
import sellerReducer from "./sellerReducer";
import itemReducer from "./itemReducer";
import reportPOReducer from "./reportPOReducer";

export default combineReducers({
  auth: authReducer,
  typeorgs: orgTypeReducer,
  orgs: orgReducer,
  groups: groupReducer,
  sellers: sellerReducer,
  items: itemReducer,
  inbound_reports_po: reportPOReducer,
  form: reduxForm
});
