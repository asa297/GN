import React from "react";
import _ from "lodash";
import { Route } from "react-router-dom";

import Header from "../components/Header";

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
// import ItemNew from "../components/Item/ItemNew";
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
import ReportDailyINV from "../components/Report/ReportDailyINV/Search/Search";
import ReportDailyINVView from "../components/Report/ReportDailyINV/View/ReportView";
import ReportDailyCashBalance from "../components/Report/ReportDailyCashBalance/Search/Search";
import ReportDailyCashBalanceView from "../components/Report/ReportDailyCashBalance/View/ReportView";
import ReportDailyCommissionGroup from "../components/Report/ReportDailyCom/Search/Search";
import ReportDailyCommissionGroupView from "../components/Report/ReportDailyCom/View/ReportView";
import ReportDailyCommissionGroupViewDetail from "../components/Report/ReportDailyCom/View/ReportViewDetail";
import ReportDeliveryNote from "../components/Report/ReportDeliveryNote/Main";
import ReportDeliveryNoteNew from "../components/Report/ReportDeliveryNote/NewReportDeliveryNote";
import ReportDeliveryNoteView from "../components/Report/ReportDeliveryNote/ViewDocument";

//Customer Display
import CustomerDisplay from "../components/CustomerMonitors/CustomerDisplay";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      case 1:
        return (
          <div>
            <Route exact path="/openpo" component={CustomerDisplay} />
            <Route
              exact
              path="/report/reportdeliverynote/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDeliveryNoteView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdeliverynote/new"
              render={() => (
                <div>
                  <Header />
                  <ReportDeliveryNoteNew />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdeliverynote"
              render={() => (
                <div>
                  <Header />
                  <ReportDeliveryNote />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycom/viewdetail"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCommissionGroupViewDetail />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycom/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCommissionGroupView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycom"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCommissionGroup />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycashbalance/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCashBalanceView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycashbalance"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCashBalance />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdailyinv/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyINVView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdailyinv"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyINV />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportoutboundinv/view/edit"
              render={() => (
                <div>
                  <Header />
                  <ReportOutBoundInventoryView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportoutboundinv"
              render={() => (
                <div>
                  <Header />
                  <ReportOutBoundInventory />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinboundinv/view/edit"
              render={() => (
                <div>
                  <Header />
                  <ReportInBoundInventoryView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinboundinv"
              render={() => (
                <div>
                  <Header />
                  <ReportInBoundInventory />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinv/view"
              render={() => (
                <div>
                  <Header />
                  <ReportInventoryView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinv"
              render={() => (
                <div>
                  <Header />
                  <ReportInventory />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportpo/view/:orderId"
              render={() => (
                <div>
                  <Header />
                  <ReportPOView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportpo/view"
              render={() => (
                <div>
                  <Header />
                  <ReportPOView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportpo"
              render={() => (
                <div>
                  <Header />
                  <ReportPO />
                </div>
              )}
            />
            <Route
              exact
              path="/report"
              render={() => (
                <div>
                  <Header />
                  <Report />
                </div>
              )}
            />
            <Route
              exact
              path="/inboundpo"
              render={() => (
                <div>
                  <Header />
                  <InboundPO />
                </div>
              )}
            />
            <Route
              exact
              path="/Item/view"
              render={() => (
                <div>
                  <Header />
                  <ItemView />
                </div>
              )}
            />
            {/* <Route
              exact
              path="/Item/new"
              render={() => (
                <div>
                  <Header />
                  <ItemNew />
                </div>
              )}
            /> */}
            <Route
              exact
              path="/Item"
              render={() => (
                <div>
                  <Header />
                  <Item />
                </div>
              )}
            />
            <Route
              exact
              path="/Seller/new"
              render={() => (
                <div>
                  <Header />
                  <SellerNew />
                </div>
              )}
            />
            <Route
              exact
              path="/Seller"
              render={() => (
                <div>
                  <Header />
                  <Seller />
                </div>
              )}
            />
            <Route
              exact
              path="/Group/view"
              render={() => (
                <div>
                  <Header />
                  <GroupView />
                </div>
              )}
            />
            <Route
              exact
              path="/Group/new"
              render={() => (
                <div>
                  <Header />
                  <GroupNew />
                </div>
              )}
            />
            <Route
              exact
              path="/Group"
              render={() => (
                <div>
                  <Header />
                  <Group />
                </div>
              )}
            />
            <Route
              exact
              path="/Org/view"
              render={() => (
                <div>
                  <Header />
                  <OrgView />
                </div>
              )}
            />
            <Route
              exact
              path="/Org/new"
              render={() => (
                <div>
                  <Header />
                  <OrgNew />
                </div>
              )}
            />
            <Route
              exact
              path="/Org"
              render={() => (
                <div>
                  <Header />
                  <Org />
                </div>
              )}
            />
            <Route
              exact
              path="/home"
              render={() => (
                <div>
                  <Header />
                  <Home />
                </div>
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <Header />
                  <DefaultHome />
                </div>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <Route exact path="/openpo" component={CustomerDisplay} />
            <Route
              exact
              path="/report/reportdeliverynote/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDeliveryNoteView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdeliverynote/new"
              render={() => (
                <div>
                  <Header />
                  <ReportDeliveryNoteNew />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdeliverynote"
              render={() => (
                <div>
                  <Header />
                  <ReportDeliveryNote />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycom/viewdetail"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCommissionGroupViewDetail />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycom/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCommissionGroupView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycom"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCommissionGroup />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycashbalance/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCashBalanceView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdialycashbalance"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyCashBalance />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdailyinv/view"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyINVView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportdailyinv"
              render={() => (
                <div>
                  <Header />
                  <ReportDailyINV />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportoutboundinv/view/edit"
              render={() => (
                <div>
                  <Header />
                  <ReportOutBoundInventoryView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportoutboundinv"
              render={() => (
                <div>
                  <Header />
                  <ReportOutBoundInventory />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinboundinv/view/edit"
              render={() => (
                <div>
                  <Header />
                  <ReportInBoundInventoryView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinboundinv"
              render={() => (
                <div>
                  <Header />
                  <ReportInBoundInventory />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinv/view"
              render={() => (
                <div>
                  <Header />
                  <ReportInventoryView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportinv"
              render={() => (
                <div>
                  <Header />
                  <ReportInventory />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportpo/view/:orderId"
              render={() => (
                <div>
                  <Header />
                  <ReportPOView />
                </div>
              )}
            />
            <Route
              exact
              path="/report/reportpo/view"
              render={() => (
                <div>
                  <Header />
                  <ReportPOView />
                </div>
              )}
            />

            <Route
              exact
              path="/report/reportpo"
              render={() => (
                <div>
                  <Header />
                  <ReportPO />
                </div>
              )}
            />
            <Route
              exact
              path="/report"
              render={() => (
                <div>
                  <Header />
                  <Report />
                </div>
              )}
            />
            <Route
              exact
              path="/inboundpo"
              render={() => (
                <div>
                  <Header />
                  <InboundPO />
                </div>
              )}
            />
            <Route
              exact
              path="/Item/view"
              render={() => (
                <div>
                  <Header />
                  <ItemView />
                </div>
              )}
            />

            <Route
              exact
              path="/Item"
              render={() => (
                <div>
                  <Header />
                  <Item />
                </div>
              )}
            />

            <Route
              exact
              path="/Seller"
              render={() => (
                <div>
                  <Header />
                  <Seller />
                </div>
              )}
            />

            <Route
              exact
              path="/Group/new"
              render={() => (
                <div>
                  <Header />
                  <GroupNew />
                </div>
              )}
            />
            <Route
              exact
              path="/Group"
              render={() => (
                <div>
                  <Header />
                  <Group />
                </div>
              )}
            />
            <Route
              exact
              path="/home"
              render={() => (
                <div>
                  <Header />
                  <Home />
                </div>
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <Header />
                  <DefaultHome />
                </div>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div>
            <Route exact path="/openpo" component={CustomerDisplay} />
            <Route
              exact
              path="/inboundpo"
              render={() => (
                <div>
                  <Header />
                  <InboundPO />
                </div>
              )}
            />
            <Route
              exact
              path="/Item/view"
              render={() => (
                <div>
                  <Header />
                  <ItemView />
                </div>
              )}
            />

            <Route
              exact
              path="/Item"
              render={() => (
                <div>
                  <Header />
                  <Item />
                </div>
              )}
            />

            <Route
              exact
              path="/Seller"
              render={() => (
                <div>
                  <Header />
                  <Seller />
                </div>
              )}
            />
            <Route
              exact
              path="/Group"
              render={() => (
                <div>
                  <Header />
                  <Group />
                </div>
              )}
            />
            <Route
              exact
              path="/home"
              render={() => (
                <div>
                  <Header />
                  <Home />
                </div>
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <Header />
                  <DefaultHome />
                </div>
              )}
            />
          </div>
        );

      default:
        return (
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <Header />
                <DefaultHome />
              </div>
            )}
          />
        );
    }
  }
};
