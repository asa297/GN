import axios from "axios";
import { FETCH_USER, POST_INBOUND_ORG } from "./type";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitInboundOrg = (values, history) => async dispatch => {
  const res = await axios.post("/api/inbound/org", values);

  history.push("/home");

  dispatch({ type: POST_INBOUND_ORG, payload: res.data });
};
