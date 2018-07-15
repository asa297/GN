import { FETCH_INBOUND_REPORT } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INBOUND_REPORT:
      return action.payload;
    default:
      return state;
  }
}
