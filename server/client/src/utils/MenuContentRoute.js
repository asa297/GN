import React from "react";
import _ from "lodash";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import DefaultHome from "../components/DefaultHome";
import InboundOrgNew from "../components/Inbound-Org/InboundOrgNew";
import InboundOrg from "../components/InboundOrg";
import InboundPO from "../components/InboundPO";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      default:
        return <Route exact path="/home" component={Home} />;
      case 1:
        return (
          <div>
            <Route exact path="/inboundorg/new" component={InboundOrgNew} />
            <Route exact path="/inboundorg" component={InboundOrg} />
            <Route exact path="/inboundpo" component={InboundPO} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={DefaultHome} />
          </div>
        );
    }
  }
};