import axios from "axios";
import { validateOrder } from "./middleware";

import {
  FETCH_USER,
  FETCH_TYPE_ORG,
  FETCH_ORG,
  FETCH_GROUP,
  FETCH_SELLER,
  FETCH_ITEM,
  FETCH_ITEM_FOR_PO,
  FETCH_REPORT_PO,
  FETCH_INBOUND_REPORT
} from "./type";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchOrgType = () => async dispatch => {
  const res = await axios.get("/api/orgType");

  dispatch({ type: FETCH_TYPE_ORG, payload: res.data });
};

// inbound org

export const submitOrg = (values, history) => async dispatch => {
  await axios.post("/api/org", values);

  history.push("/Org");
};

export const fetch_Org = () => async dispatch => {
  const res = await axios.get("/api/org");

  dispatch({ type: FETCH_ORG, payload: res.data });
};

export const update_Org = (org_id, values, onUpdateOrg) => async dispatch => {
  await axios.post("/api/org/edit/" + org_id, values);
  onUpdateOrg();
};

export const delete_Org = org_id => async dispatch => {
  const res = await axios.delete("/api/org/" + org_id);

  dispatch({ type: FETCH_ORG, payload: res.data });
};

// inbound group
export const submitGroup = (values, history) => async dispatch => {
  await axios.post("/api/group", values);

  history.push("/Group");
};

export const fetch_Group = () => async dispatch => {
  const res = await axios.get("/api/group");

  dispatch({ type: FETCH_GROUP, payload: res.data });
};

export const update_Group = (
  group_id,
  values,
  onUpdateGroup
) => async dispatch => {
  await axios.post("/api/group/edit/" + group_id, values);
  onUpdateGroup();
};

export const delete_Group = group_id => async dispatch => {
  const res = await axios.delete("/api/group/" + group_id);

  dispatch({ type: FETCH_GROUP, payload: res.data });
};

//inbound seller

export const submitSeller = (values, history) => async dispatch => {
  await axios.post("/api/seller", values);

  history.push("/Seller");
};

export const fetch_Seller = () => async dispatch => {
  const res = await axios.get("/api/seller");

  dispatch({ type: FETCH_SELLER, payload: res.data });
};

export const update_Seller = (
  seller_id,
  values,
  onUpdateSeller
) => async dispatch => {
  await axios.post("/api/seller/edit/" + seller_id, values);
  onUpdateSeller();
};

export const delete_Seller = seller_id => async dispatch => {
  const res = await axios.delete("/api/seller/" + seller_id);

  dispatch({ type: FETCH_SELLER, payload: res.data });
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

  await axios.post("/api/item", values);

  history.push("/Item");
};

export const fetch_Item = () => async dispatch => {
  const res = await axios.get("/api/item");

  dispatch({ type: FETCH_ITEM, payload: res.data });
};

export const find_Item = item_code => async dispatch => {
  const res = await axios.get("/api/item/" + item_code);

  dispatch({ type: FETCH_ITEM_FOR_PO, payload: res.data });
};

export const update_Item = (
  item_id,
  values,
  orgChinaList
) => async dispatch => {
  if (orgChinaList) {
    values.orgChinaList = orgChinaList;
  }

  await axios.post("/api/item/edit/" + item_id, values);
};

export const delete_Item = (item_id, history) => async dispatch => {
  const res = await axios.delete("/api/item/" + item_id);

  dispatch({ type: FETCH_ITEM, payload: res.data });
};

export const updateStock_Item = (item_id, values) => async dispatch => {
  const res = await axios
    .post("/api/item/edit/" + item_id, values)
    .then(response => {
      return response.status;
    })
    .catch(error => {
      return error;
    });

  return res;
};

export const deleteInbound_Item = (item_id, history) => async dispatch => {
  await axios.delete("/api/item/" + item_id).then(response => {
    history.push("/report/reportinv");
  });
};

//inbound order
export const submitInboundOrder = values => async () => {
  const formvalues = validateOrder(values);
  const res = await axios
    .post("/api/order", formvalues)
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

  dispatch({ type: FETCH_REPORT_PO, payload: res.data });
};

export const fetchInbound_ReportPO_Filter = formvalue => async dispatch => {
  if (formvalue.values) {
    const { values } = formvalue;
    const res = await axios.post("/api/order_filter", values);
    dispatch({ type: FETCH_REPORT_PO, payload: res.data });
  } else {
    const res = await axios.get("/api/order");
    dispatch({ type: FETCH_REPORT_PO, payload: res.data });
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

//ItemElement
export const submitInbound_ItemElement = values => async () => {
  const res = await axios
    .post("/api/itemelement/inbound", values)
    .then(response => {
      return response.status;
    })
    .catch(error => {
      return error;
    });

  return res;
};

export const fetchInbound_ItemElement = values => async dispatch => {
  const res = await axios
    .get("/api/itemelement/inbound")
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_INBOUND_REPORT, payload: res.data });
};
