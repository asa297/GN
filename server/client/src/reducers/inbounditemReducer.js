import { FETCH_INBOUND_ITEM, FETCH_INBOUND_ITEM_FOR_PO } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INBOUND_ITEM:
      return action.payload;
    case FETCH_INBOUND_ITEM_FOR_PO:
      return [action.payload, ...state];
    default:
      return state;
  }
}
