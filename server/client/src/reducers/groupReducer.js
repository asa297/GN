import { FETCH_GROUP } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_GROUP:
      return action.payload;
    default:
      return state;
  }
}
