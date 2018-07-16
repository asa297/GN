import { FETCH_OUTBOUND_REPORT } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_OUTBOUND_REPORT:
      return action.payload;
    default:
      return state;
  }
}
