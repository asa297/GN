import React from "react";
import _ from "lodash";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import DefaultHome from "../components/DefaultHome";
//Org
import Org from "../components/Org/Org";
import OrgNew from "../components/Org/OrgNew";
import OrgView from "../components/Org/view/viewOrg";
//Group
import Group from "../components/Group/Group";
import GroupNew from "../components/Group/GroupNew";
import GroupView from "../components/Group/view/viewGroup";
//Seller
import Seller from "../components/Seller/Seller";
import SellerNew from "../components/Seller/SellerNew";
//Item
import Item from "../components/Item/Item";
import ItemNew from "../components/Item/ItemNew";
import ItemView from "../components/Item/view/viewItem";
//PO
import InboundPO from "../components/PO/PO";
//Report
import Report from "../components/Report/Report";
import ReportPO from "../components/Report/ReportPO/ReportPO";
import ReportPOView from "../components/Report/ReportPO/ReportPOView";
import ReportInventory from "../components/Report/ReportINV/ReportINV";
import ReportInventoryView from "../components/Report/ReportINV/ReportINVView";
import ReportInBoundInventory from "../components/Report/ReportInboundINV/ReportView";
import ReportInBoundInventoryView from "../components/Report/ReportInboundINV/Component/View/InboundItem";
import ReportOutBoundInventory from "../components/Report/ReportOutboundINV/ReportView";
import ReportOutBoundInventoryView from "../components/Report/ReportOutboundINV/Component/View/OutboundItem";
// import ReportOutBoundInventory from "../components/Report/ReportOutboundINV/ReportView";
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
              path="/report/reportoutboundinv/view/edit"
              component={ReportOutBoundInventoryView}
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
            <Route exact path="/Item/view" component={ItemView} />
            <Route exact path="/Item/new" component={ItemNew} />
            <Route exact path="/Item" component={Item} />
            <Route exact path="/Seller/new" component={SellerNew} />
            <Route exact path="/Seller" component={Seller} />
            <Route exact path="/Group/view" component={GroupView} />
            <Route exact path="/Group/new" component={GroupNew} />
            <Route exact path="/Group" component={Group} />
            <Route exact path="/Org/view" component={OrgView} />
            <Route exact path="/Org/new" component={OrgNew} />
            <Route exact path="/Org" component={Org} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={DefaultHome} />
          </div>
        );
      default:
        return <Route exact path="/home" component={Home} />;
    }
  }
};
