import React from "react";
import ReportPOView from "./ReportPOView.css";

const Header = ({ report_PO }) => {
  if (report_PO) {
    const { orderId, RecordNameBy, RecordDate } = report_PO;

    return (
      <div className={ReportPOView.ReportPOView_Header}>
        <b>orderId :</b>
        <i>{orderId}</i>&nbsp;
        <b>RecordNameBy :</b>
        <i>{RecordNameBy}</i>&nbsp;
        <b>Date :</b>
        <i>{new Date(RecordDate).toLocaleDateString()}</i>&nbsp;
        <b>Time :</b>
        <i>{new Date(RecordDate).toLocaleTimeString()}</i>&nbsp;
      </div>
    );
  }

  return null;
};

export default Header;
