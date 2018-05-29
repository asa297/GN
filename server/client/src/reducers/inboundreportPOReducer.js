import { FETCH_INBOUND_REPORT_PO } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INBOUND_REPORT_PO:
      return action.payload;
    default:
      return state;
  }
}
