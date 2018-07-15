import { FETCH_SELLER } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SELLER:
      return action.payload;
    default:
      return state;
  }
}
