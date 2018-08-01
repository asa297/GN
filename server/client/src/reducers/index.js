import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import orgTypeReducer from "./orgTypeReducer";
import orgReducer from "./orgReducer";
import groupReducer from "./groupReducer";
import sellerReducer from "./sellerReducer";
import itemReducer from "./itemReducer";
import reportPOReducer from "./reportPOReducer";
import reportInboundItemReducer from "./reportInboundItemReducer";
import reportOutboundItemReducer from "./reportOutboundItemReducer";
import reportDailyItemReducer from "./reportDailyItemReducer";
import reportDailyCashBalanceReducer from "./reportDailyCashBalanceReducer";
import reportDailyComReducer from "./reportDailyComReducer";

export default combineReducers({
  auth: authReducer,
  typeorgs: orgTypeReducer,
  orgs: orgReducer,
  groups: groupReducer,
  sellers: sellerReducer,
  items: itemReducer,
  reports_po: reportPOReducer,
  reports_inbound_item: reportInboundItemReducer,
  reports_outbound_item: reportOutboundItemReducer,
  reports_daily_inv_item: reportDailyItemReducer,
  reports_daily_cashbalance: reportDailyCashBalanceReducer,
  report_daily_com: reportDailyComReducer,
  form: reduxForm
});
