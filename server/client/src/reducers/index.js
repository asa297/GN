import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgTypeReducer from "./orgTypeReducer";
import inbound_orgReducer from "./inboundorgReducer";
import inbound_groupReducer from "./inboundgroupReducer";

export default combineReducers({
  auth: authReducer,
  typeorgs: orgTypeReducer,
  inbound_orgs: inbound_orgReducer,
  inbound_groups: inbound_groupReducer,
  form: reduxForm
});
