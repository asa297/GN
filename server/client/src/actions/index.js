import axios from "axios";
import { validateOrder } from "./middleware";
import Alert from "react-s-alert";

import {
  FETCH_USER,
  FETCH_TYPE_ORG,
  FETCH_BRANCH,
  FETCH_ORG,
  FETCH_GROUP,
  FETCH_SELLER,
  FETCH_ITEM,
  FETCH_ITEM_FOR_PO,
  FETCH_REPORT_PO,
  FIND_REPORT_PO,
  FETCH_INBOUND_REPORT,
  FETCH_OUTBOUND_REPORT,
  FETCH_DIALY_INV_REPORT,
  FETCH_DIALY_CASHBALANCE_REPORT,
  FETCH_DIALY_COM_REPORT,
  FETCH_DELIVERY_NOTE
} from "./type";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchOrgType = () => async dispatch => {
  const res = await axios.get("/api/orgType");

  dispatch({ type: FETCH_TYPE_ORG, payload: res.data });
};

export const fetchBranch = () => async dispatch => {
  const res = await axios.get("/api/branch");

  dispatch({ type: FETCH_BRANCH, payload: res.data });
};

// inbound org

export const submitOrg = (values, history) => async () => {
  await axios
    .post("/api/org", values)
    .then(response => {
      Alert.success(`Create New Organization List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

  history.push("/Org");
};

export const fetch_Org = () => async dispatch => {
  const res = await axios.get("/api/org");

  dispatch({ type: FETCH_ORG, payload: res.data });
};

export const update_Org = (org_id, values, onUpdateOrg) => async () => {
  await axios
    .post("/api/org/edit/" + org_id, values)
    .then(response => {
      Alert.success(`Saved Organization List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

  onUpdateOrg();
};

export const delete_Org = org_id => async () => {
  await axios
    .delete("/api/org/" + org_id)
    .then(response => {
      Alert.success(`Delete Organization List.`, {
        position: "bottom",
        timeout: 2000
      });

      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
};

// inbound group
export const submitGroup = (values, history) => async () => {
  // const res = await axios.post("/api/group", values);

  await axios
    .post("/api/group", values)
    .then(response => {
      Alert.success(`Create New Group List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

  history.push("/Group");
};

export const fetch_Group = () => async dispatch => {
  const res = await axios.get("/api/group");

  dispatch({ type: FETCH_GROUP, payload: res.data });
};

export const fetch_Group_Filter = () => async dispatch => {
  const res = await axios.get("/api/group/filter");

  dispatch({ type: FETCH_GROUP, payload: res.data });
};

export const update_Group = (group_id, values, onUpdateGroup) => async () => {
  await axios
    .post("/api/group/edit/" + group_id, values)
    .then(response => {
      Alert.success(`Saved Group List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

  onUpdateGroup();
};

export const delete_Group = group_id => async () => {
  await axios
    .delete("/api/group/" + group_id)
    .then(response => {
      Alert.success(`Delete Group List.`, {
        position: "bottom",
        timeout: 2000
      });

      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
};

//inbound seller

export const submitSeller = (values, history) => async () => {
  await axios
    .post("/api/seller", values)
    .then(response => {
      Alert.success(`Create New Seller List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

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
) => async () => {
  await axios
    .post("/api/seller/edit/" + seller_id, values)
    .then(response => {
      Alert.success(`Saved Seller List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

  onUpdateSeller();
};

export const delete_Seller = seller_id => async () => {
  await axios
    .delete("/api/seller/" + seller_id)
    .then(response => {
      Alert.success(`Delete Seller List.`, {
        position: "bottom",
        timeout: 2000
      });

      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
};

//inbound item

export const submitInboundItem = (values, history) => async () => {
  await axios
    .post("/api/item", values)
    .then(response => {
      Alert.success(`Create New Item List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

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

export const update_Item = (item_id, values) => async () => {
  await axios
    .post("/api/item/edit/" + item_id, values)
    .then(response => {
      Alert.success(`Saved Item List.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
};

// export const delete_Item = item_id => async () => {
//   await axios
//     .delete("/api/item/" + item_id)
//     .then(response => {
//       Alert.success(`Delete Item List.`, {
//         position: "bottom",
//         timeout: 2000
//       });

//       return response;
//     })
//     .catch(error => {
//       Alert.error(`Something is wrong.`, {
//         position: "bottom",
//         timeout: 2000
//       });
//       return error;
//     });
// };

export const updateStock_Item = (item_id, qty) => async () => {
  const res = await axios
    .put("/api/item/stock/" + item_id, qty)
    .then(response => {
      Alert.success(`Update Item Stock.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
  // const res = await axios
  //   .post("/api/item/edit/" + item_id, values)
  //   .then(response => {
  //     return response.status;
  //   })
  //   .catch(error => {
  //     return error;
  //   });

  return res;
};

// export const deleteInbound_Item = (item_id, history) => async dispatch => {
//   const res = await axios.delete("/api/item/" + item_id);

//   if (res.status === 200) {
//     Alert.success(`Delete Item List.`, {
//       position: "bottom",
//       timeout: 2000
//     });
//   } else {
//     Alert.error(`Something is wrong.`, {
//       position: "bottom",
//       timeout: 2000
//     });
//   }

//   history.push("/report/reportinv");
// };

//inbound order
export const submit_Order = values => async () => {
  const formvalues = validateOrder(values);
  const res = await axios
    .post("/api/order", formvalues)
    .then(response => {
      Alert.success(`Create Order.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

  return res.data;
};

export const fetch_ReportPO = () => async dispatch => {
  const res = await axios.get("/api/order");

  dispatch({ type: FETCH_REPORT_PO, payload: res.data });
};

export const find_ReportPO = orderId => async dispatch => {
  const res = await axios.get("/api/order/" + orderId);

  dispatch({ type: FIND_REPORT_PO, payload: res.data });
};

export const fetch_ReportPO_Filter = formvalue => async dispatch => {
  if (formvalue.values) {
    const { values } = formvalue;
    const res = await axios.post("/api/order/filter", values);
    dispatch({ type: FETCH_REPORT_PO, payload: res.data });
  } else {
    const res = await axios.get("/api/order");
    dispatch({ type: FETCH_REPORT_PO, payload: res.data });
  }
};

export const update_ReportPO = (orderId, formvalues, history) => async () => {
  await axios
    .post("/api/order/edit/" + orderId, formvalues.values)
    .then(response => {
      Alert.success(`Saved Order.`, {
        position: "bottom",
        timeout: 2000
      });

      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
  history.push("/report/reportpo");
};

export const delete_ReportPO = (orderId, history) => async () => {
  await axios
    .delete("/api/order/" + orderId)
    .then(response => {
      Alert.success(`Delete Order.`, {
        position: "bottom",
        timeout: 2000
      });

      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });

  history.push("/report/reportpo");
};

//Item Element Inbound
export const submitInbound_ItemElement = values => async () => {
  await axios
    .post("/api/itemelement/inbound", values)
    .then(response => {
      Alert.success(`Create Item Element.`, {
        position: "bottom",
        timeout: 2000
      });

      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
};

export const fetchInbound_ItemElement = () => async dispatch => {
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

export const fetchInbound_ItemElement_Filter = filter => async dispatch => {
  const res = await axios
    .post("/api/itemelement/inbound/filter", filter)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_INBOUND_REPORT, payload: res.data });
};

//Item Element Outbound
export const submitOutbound_ItemElement = values => async () => {
  await axios
    .post("/api/itemelement/outbound", values)
    .then(response => {
      Alert.success(`Create Item Element.`, {
        position: "bottom",
        timeout: 2000
      });

      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
};

export const submitOutbound_ItemElement_PO = itemList => async () => {
  await axios
    .post("/api/itemelement/outbound/po", itemList)
    .then(response => {
      Alert.success(`Create Item Element.`, {
        position: "bottom",
        timeout: 2000
      });
      return response;
    })
    .catch(error => {
      Alert.error(`Something is wrong.`, {
        position: "bottom",
        timeout: 2000
      });
      return error;
    });
};

export const fetchOutbound_ItemElement = () => async dispatch => {
  const res = await axios
    .get("/api/itemelement/outbound")
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_OUTBOUND_REPORT, payload: res.data });
};

export const fetchOutbound_ItemElement_Filter = filter => async dispatch => {
  const res = await axios
    .post("/api/itemelement/outbound/filter", filter)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_OUTBOUND_REPORT, payload: res.data });
};

//Daily Inventory report
export const fetchDialy_Inventory_Filter = filter => async dispatch => {
  const res = await axios
    .post("/api/itemelement/daily/filter", filter)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_DIALY_INV_REPORT, payload: res.data });
};

//Daily Cash Balance report
export const fetchDialy_CashBalance_Filter = filter => async dispatch => {
  const res = await axios
    .post("/api/order/daily/cashbalance/filter", filter)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_DIALY_CASHBALANCE_REPORT, payload: res.data });
};

//Daily Com report
export const fetchDialy_Com_Filter = filter => async dispatch => {
  const res = await axios
    .post("/api/order/daily/com/filter", filter)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_DIALY_COM_REPORT, payload: res.data });
};

//Delivery Note
export const SubmitDeliveryNote = values => async () => {
  const res = await axios
    .post("/api/deliverynote", values)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  return res;
};

export const FetchDeliveryNote = () => async dispatch => {
  const res = await axios
    .get("/api/deliverynote")
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_DELIVERY_NOTE, payload: res.data });
};

export const ApproveDeliveryNote = _id => async () => {
  const res = await axios
    .put("/api/deliverynote/action/approve/" + _id)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  return res;
};

export const RejectDeliveryNote = _id => async () => {
  const res = await axios
    .put("/api/deliverynote/action/reject/" + _id)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  return res;
};

export const FindDeliveryNote = DN_Id => async dispatch => {
  const res = await axios
    .get("/api/deliverynote/" + DN_Id)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: FETCH_DELIVERY_NOTE, payload: res.data });
};
