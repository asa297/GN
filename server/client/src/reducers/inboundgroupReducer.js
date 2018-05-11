import { FETCH_INBOUND_GROUP } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INBOUND_GROUP:
      return action.payload;
    default:
      return state;
  }
}
