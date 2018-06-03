import axios from "axios";

import {
  FETCH_USER,
  FETCH_TYPE_ORG,
  FETCH_INBOUND_ORG,
  FETCH_INBOUND_GROUP,
  FETCH_INBOUND_SELLER,
  FETCH_INBOUND_ITEM,
  FETCH_INBOUND_REPORT_PO
} from "./type";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

// inbound org

export const fetchOrgType = () => async dispatch => {
  const res = await axios.get("/api/orgType");

  dispatch({ type: FETCH_TYPE_ORG, payload: res.data });
};

export const submitInboundOrg = (values, history) => async dispatch => {
  await axios.post("/api/inbound/org", values);

  history.push("/inboundorg");
};

export const fetchInbound_Org = () => async dispatch => {
  const res = await axios.get("/api/inbound/org");

  dispatch({ type: FETCH_INBOUND_ORG, payload: res.data });
};

export const updateInbound_Org = (
  org_id,
  values,
  onUpdateOrg
) => async dispatch => {
  await axios.post("/api/inbound/org/edit/" + org_id, values);
  onUpdateOrg();
};

export const deleteInbound_Org = org_id => async dispatch => {
  const res = await axios.delete("/api/inbound/org/" + org_id);

  dispatch({ type: FETCH_INBOUND_ORG, payload: res.data });
};

// inbound group
export const submitInboundGroup = (values, history) => async dispatch => {
  await axios.post("/api/inbound/group", values);

  history.push("/inboundgroup");
};

export const fetchInbound_Group = () => async dispatch => {
  const res = await axios.get("/api/inbound/group");

  dispatch({ type: FETCH_INBOUND_GROUP, payload: res.data });
};

export const updateInbound_Group = (
  group_id,
  values,
  onUpdateGroup
) => async dispatch => {
  await axios.post("/api/inbound/group/edit/" + group_id, values);
  onUpdateGroup();
};

export const deleteInbound_Group = group_id => async dispatch => {
  const res = await axios.delete("/api/inbound/group/" + group_id);

  dispatch({ type: FETCH_INBOUND_GROUP, payload: res.data });
};

//inbound seller

export const submitInboundSeller = (values, history) => async dispatch => {
  await axios.post("/api/inbound/seller", values);

  history.push("/inboundseller");
};

export const fetchInbound_Seller = () => async dispatch => {
  const res = await axios.get("/api/inbound/seller");

  dispatch({ type: FETCH_INBOUND_SELLER, payload: res.data });
};

export const updateInbound_Seller = (
  seller_id,
  values,
  onUpdateSeller
) => async dispatch => {
  await axios.post("/api/inbound/seller/edit/" + seller_id, values);
  onUpdateSeller();
};

export const deleteInbound_Seller = seller_id => async dispatch => {
  const res = await axios.delete("/api/inbound/seller/" + seller_id);

  dispatch({ type: FETCH_INBOUND_SELLER, payload: res.data });
};

//inbound item

export const submitInboundItem = (
  values,
  orgChinaList,
  history
) => async dispatch => {
  if (orgChinaList) {
    values.orgChinaList = orgChinaList;
  }

  await axios.post("/api/inbound/item", values);

  history.push("/inbounditem");
};

export const fetchInbound_Item = () => async dispatch => {
  const res = await axios.get("/api/inbound/item");

  dispatch({ type: FETCH_INBOUND_ITEM, payload: res.data });
};

export const updateInbound_Item = (
  item_id,
  values,
  orgChinaList,
  history
  // onUpdateItem
) => async dispatch => {
  if (orgChinaList) {
    values.orgChinaList = orgChinaList;
  }
  // await axios.post("/api/inbound/item/edit/" + item_id, values);

  await axios
    .post("/api/inbound/item/edit/" + item_id, values)
    .then(response => {
      history.push("/report/reportinv");
    });

  // onUpdateItem();
};

export const deleteInbound_Item = (item_id, history) => async dispatch => {
  await axios.delete("/api/inbound/item/" + item_id).then(response => {
    history.push("/report/reportinv");
  });

  // const res = await axios.delete("/api/inbound/item/" + item_id);

  // dispatch({ type: FETCH_INBOUND_ITEM, payload: res.data });
};

//inbound order

export const submitInboundOrder = values => async () => {
  const res = await axios
    .post("/api/order", values)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  return res.data;
};

export const fetchInbound_ReportPO = () => async dispatch => {
  const res = await axios.get("/api/order");

  dispatch({ type: FETCH_INBOUND_REPORT_PO, payload: res.data });
};

export const fetchInbound_ReportPO_Filter = formvalue => async dispatch => {
  if (formvalue.report_po.values) {
    const { values } = formvalue.report_po;
    const res = await axios.post("/api/order_filter", values);
    dispatch({ type: FETCH_INBOUND_REPORT_PO, payload: res.data });
  } else {
    const res = await axios.get("/api/order");
    dispatch({ type: FETCH_INBOUND_REPORT_PO, payload: res.data });
  }
};

export const updateInbound_ReportPO = (
  orderId,
  formvalues,
  history
) => async dispatch => {
  await axios
    .post("/api/order/edit/" + orderId, formvalues.values)
    .then(response => {
      history.push("/report/reportpo");
    });
};

export const deleteInbound_ReportPO = (orderId, history) => async dispatch => {
  await axios.delete("/api/order/" + orderId).then(response => {
    history.push("/report/reportpo");
  });
};
