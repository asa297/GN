import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import inbound_orgReducer from "./inboundorgReducer";

export default combineReducers({
  auth: authReducer,
  inbound_orgs: inbound_orgReducer,
  form: reduxForm
});
