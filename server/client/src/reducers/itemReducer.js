import { FETCH_ITEM, FETCH_ITEM_FOR_PO } from "../actions/type";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ITEM:
      return action.payload;
    case FETCH_ITEM_FOR_PO:
      return action.payload;

    default:
      return state;
  }
}
