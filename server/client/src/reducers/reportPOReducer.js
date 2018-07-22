import { FETCH_REPORT_PO, FIND_REPORT_PO } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_REPORT_PO:
      return action.payload;
    case FIND_REPORT_PO:
      return [...state, action.payload];
    default:
      return state;
  }
}
