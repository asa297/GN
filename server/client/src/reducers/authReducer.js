import { FETCH_USER } from "../actions/type";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload ? action.payload : false;
    default:
      return state;
  }
}
