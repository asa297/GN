import { FETCH_DIALY_INV_REPORT } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DIALY_INV_REPORT:
      return action.payload;
    default:
      return state;
  }
}
