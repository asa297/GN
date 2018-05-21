import React, { Component } from "react";
import POSelectGruop from "./POSelectGruop";
import POItemOrder from "./POItemOrder";

class PO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_selectGroup: true,
      show_itemOrder: false,
      show_payment: false
    };
  }

  renderContent() {
    if (this.state.show_itemOrder) {
      return (
        <POItemOrder
          onSubmit={() =>
            this.setState({ show_itemOrder: false, show_payment: true })
          }
        />
      );
    }
    return (
      <POSelectGruop
        onSubmit={() =>
          this.setState({ show_selectGroup: false, show_itemOrder: true })
        }
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default PO;
