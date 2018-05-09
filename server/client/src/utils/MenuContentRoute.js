import React from "react";
import _ from "lodash";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import InboundGroup from "../components/InboundGroup";
import InboundPO from "../components/InboundPO";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      default:
        return <Route exact path="/home" component={Home} />;
      case 1:
        return (
          <div>
            <Route exact path="/home" component={Home} />
            <Route exact path="/inboundgroup" component={InboundGroup} />
            <Route exact path="/inboundpo" component={InboundPO} />
          </div>
        );
    }
  }
};
