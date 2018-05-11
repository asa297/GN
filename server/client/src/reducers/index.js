import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import inbound_orgReducer from "./inboundorgReducer";
import inbound_groupReducer from "./inboundgroupReducer";

export default combineReducers({
  auth: authReducer,
  inbound_orgs: inbound_orgReducer,
  inbound_groups: inbound_groupReducer,
  form: reduxForm
});
