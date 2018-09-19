import { FETCH_BRANCH } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BRANCH:
      return action.payload;
    default:
      return state;
  }
}
