import React from "react";
import _ from "lodash";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import DefaultHome from "../components/DefaultHome";
//Org
import InboundOrgNew from "../components/Inbound-Org/InboundOrgNew";
import InboundOrg from "../components/Inbound-Org/InboundOrg";
import InboundOrgView from "../components/Inbound-Org/view/viewOrg";
//Group
import InboundGroup from "../components/Inbound-Group/InboundGroup";
import InboundGroupNew from "../components/Inbound-Group/InboundGroupNew";
import InboundGroupView from "../components/Inbound-Group/view/viewGroup";
//Seller
import InboundSeller from "../components/Inbound-Seller/InboundSeller";
import InboundSellerNew from "../components/Inbound-Seller/InboundSellerNew";
//Item
import InboundItem from "../components/Inbound-Item/InboundItem";
import InboundItemNew from "../components/Inbound-Item/InboundItemNew";
import InboundItemView from "../components/Inbound-Item/view/viewItem";
//PO
import InboundPO from "../components/Inbound-PO/PO";
//Report
import Report from "../components/Report/Report";
import ReportPO from "../components/Report/ReportPO/ReportPO";
import ReportPOView from "../components/Report/ReportPO/ReportPOView";
import ReportInventory from "../components/Report/ReportINV/ReportINV";
import ReportInventoryView from "../components/Report/ReportINV/ReportINVView";
import ReportInBoundInventory from "../components/Report/ReportInboundINV/ReportView";
import ReportInBoundInventoryView from "../components/Report/ReportInboundINV/Component/View/InboundItem";
import ReportOutBoundInventory from "../components/Report/ReportOutboundINV/ReportView";
import ReportDailyINV from "../components/Report/ReportDailyINV/Search/Search";
import ReportDailyINVView from "../components/Report/ReportDailyINV/View/ReportView";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      case 1:
        return (
          <div>
            <Route
              exact
              path="/report/reportdailyinv/view"
              component={ReportDailyINVView}
            />
            <Route
              exact
              path="/report/reportdailyinv"
              component={ReportDailyINV}
            />
            <Route
              exact
              path="/report/reportoutboundinv"
              component={ReportOutBoundInventory}
            />
            <Route
              exact
              path="/report/reportinboundinv/view/edit"
              component={ReportInBoundInventoryView}
            />
            <Route
              exact
              path="/report/reportinboundinv"
              component={ReportInBoundInventory}
            />
            <Route
              exact
              path="/report/reportinv/view"
              component={ReportInventoryView}
            />
            <Route exact path="/report/reportinv" component={ReportInventory} />
            <Route
              exact
              path="/report/reportpo/view"
              component={ReportPOView}
            />
            <Route exact path="/report/reportpo" component={ReportPO} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/inboundpo" component={InboundPO} />
            <Route exact path="/inbounditem/view" component={InboundItemView} />
            <Route exact path="/inbounditem/new" component={InboundItemNew} />
            <Route exact path="/inbounditem" component={InboundItem} />
            <Route
              exact
              path="/inboundseller/new"
              component={InboundSellerNew}
            />
            <Route exact path="/inboundseller" component={InboundSeller} />
            <Route
              exact
              path="/inboundgroup/view"
              component={InboundGroupView}
            />
            <Route exact path="/inboundgroup/new" component={InboundGroupNew} />
            <Route exact path="/inboundgroup" component={InboundGroup} />
            <Route exact path="/inboundorg/view" component={InboundOrgView} />
            <Route exact path="/inboundorg/new" component={InboundOrgNew} />
            <Route exact path="/inboundorg" component={InboundOrg} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={DefaultHome} />
          </div>
        );
      default:
        return <Route exact path="/home" component={Home} />;
    }
  }
};
