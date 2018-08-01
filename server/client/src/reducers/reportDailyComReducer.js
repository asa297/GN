import { FETCH_DIALY_COM_REPORT } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DIALY_COM_REPORT:
      return action.payload;
    default:
      return state;
  }
}
