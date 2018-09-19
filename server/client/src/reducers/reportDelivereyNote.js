import { FETCH_DELIVERY_NOTE } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DELIVERY_NOTE:
      return action.payload;
    default:
      return state;
  }
}
