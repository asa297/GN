import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgTypeReducer from "./orgTypeReducer";
import orgReducer from "./orgReducer";
import groupReducer from "./groupReducer";
import sellerReducer from "./sellerReducer";
import itemReducer from "./itemReducer";
import reportPOReducer from "./reportPOReducer";
import reportInboundItem from "./reportInboundItemReducer";
import reportOutboundItem from "./reportOutboundItemReducer";
import reportDailyInventoryItem from "./reportDailyItemReducer";

export default combineReducers({
  auth: authReducer,
  typeorgs: orgTypeReducer,
  orgs: orgReducer,
  groups: groupReducer,
  sellers: sellerReducer,
  items: itemReducer,
  reports_po: reportPOReducer,
  reports_inbound_item: reportInboundItem,
  reports_outbound_item: reportOutboundItem,
  reports_daily_inv_item: reportDailyInventoryItem,
  form: reduxForm
});
