import React from "react";
import _ from "lodash";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import DefaultHome from "../components/DefaultHome";
import InboundOrgNew from "../components/Inbound-Org/InboundOrgNew";
import InboundOrg from "../components/Inbound-Org/InboundOrg";
import InboundGroup from "../components/Inbound-Group/InboundGroup";
import InboundGroupNew from "../components/Inbound-Group/InboundGroupNew";
import InboundPO from "../components/Inbound_PO/PO";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      case 1:
        return (
          <div>
            <Route exact path="/inboundpo" component={InboundPO} />
            <Route exact path="/inboundgroup/new" component={InboundGroupNew} />
            <Route exact path="/inboundgroup" component={InboundGroup} />
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
