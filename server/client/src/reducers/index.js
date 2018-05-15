import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgTypeReducer from "./orgTypeReducer";
import inbound_orgReducer from "./inboundorgReducer";
import inbound_groupReducer from "./inboundgroupReducer";
import inbound_sellerReducer from "./inboundsellerReducer";

export default combineReducers({
  auth: authReducer,
  typeorgs: orgTypeReducer,
  inbound_orgs: inbound_orgReducer,
  inbound_groups: inbound_groupReducer,
  inbound_sellers: inbound_sellerReducer,
  form: reduxForm
});
