import { FETCH_TYPE_ORG } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TYPE_ORG:
      return action.payload;
    default:
      return state;
  }
}
