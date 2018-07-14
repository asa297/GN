import { FETCH_INBOUND_ORG } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INBOUND_ORG:
      return action.payload;
    default:
      return state;
  }
}
