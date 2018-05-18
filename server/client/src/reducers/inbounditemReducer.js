import { FETCH_INBOUND_ITEM } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INBOUND_ITEM:
      return action.payload;
    default:
      return state;
  }
}
