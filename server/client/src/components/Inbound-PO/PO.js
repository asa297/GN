import React, { Component } from "react";
import POSelectGruop from "./POSelectGruop";
import POSelectSeller from "./POSelectSeller";
import POItemOrder from "./POItemOrder";
import POPayment from "./POPayment";

class PO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_selectGroup: true,
      show_selectSeller: false,
      show_itemOrder: false,
      show_payment: false
    };
  }

  renderContent() {
    if (this.state.show_selectSeller) {
      return (
        <POSelectSeller
          onSubmit={() =>
            this.setState({ show_selectSeller: false, show_itemOrder: true })
          }
          onCancal={() => {
            this.setState({ show_selectGroup: true, show_selectSeller: false });
          }}
        />
      );
    } else if (this.state.show_itemOrder) {
      return (
        <POItemOrder
          onSubmit={itemList =>
            this.setState({
              show_itemOrder: false,
              itemList,
              show_payment: true
            })
          }
        />
      );
    } else if (this.state.show_payment) {
      return <POPayment />;
    }

    return (
      <POSelectGruop
        onSubmit={() =>
          this.setState({ show_selectGroup: false, show_selectSeller: true })
        }
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default PO;