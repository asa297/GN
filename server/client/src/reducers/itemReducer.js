import { FETCH_INBOUND_ITEM, FETCH_INBOUND_ITEM_FOR_PO } from "../actions/type";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_INBOUND_ITEM:
      return action.payload;
    case FETCH_INBOUND_ITEM_FOR_PO:
      return action.payload;

    default:
      return state;
  }
}
