import axios from "axios";
import {
  FETCH_USER,
  POST_INBOUND_ORG,
  FETCH_INBOUND_ORG,
  POST_INBOUND_GROUP,
  FETCH_INBOUND_GROUP
} from "./type";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitInboundOrg = (values, history) => async dispatch => {
  const res = await axios.post("/api/inbound/org", values);

  history.push("/home");

  dispatch({ type: POST_INBOUND_ORG, payload: res.data });
};

export const fetchInbound_Org = () => async dispatch => {
  const res = await axios.get("/api/inbound/org");

  dispatch({ type: FETCH_INBOUND_ORG, payload: res.data });
};

export const submitInboundGroup = (values, history) => async dispatch => {
  const res = await axios.post("/api/inbound/group", values);

  history.push("/home");

  dispatch({ type: POST_INBOUND_GROUP, payload: res.data });
};

export const fetchInbound_Group = () => async dispatch => {
  const res = await axios.get("/api/inbound/group");

  dispatch({ type: FETCH_INBOUND_GROUP, payload: res.data });
};
