import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";
import { fetchInbound_Group, fetchInbound_Seller } from "../../actions";
import Collapsible from "react-collapsible";
import POSelectGruop from "./POSelectGruop";
import POSelectSeller from "./POSelectSeller";
import POItemOrder from "./POItemOrder";
import POPayment from "./POPayment";
import POReview from "./POReview";
import POPrint from "./POPrint";

import PO_CSS from "../../Style/CSS/PO_CSS.css";

class PO extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     show_selectGroup: true,
  //     show_selectSeller: false,
  //     show_itemOrder: false,
  //     show_payment: false,
  //     show_review: false,
  //     show_printing: false
  //   };
  // }

  componentDidMount() {
    this.props.dispatch(reset("inbound_po"));
    this.props.fetchInbound_Group();
    this.props.fetchInbound_Seller();
  }

  // renderContent() {
  //   if (this.state.show_selectSeller) {
  //     return (
  //       <POSelectSeller
  //         onSubmit={() =>
  //           this.setState({ show_selectSeller: false, show_itemOrder: true })
  //         }
  //         onCancal={() => {
  //           this.setState({ show_selectGroup: true, show_selectSeller: false });
  //         }}
  //       />
  //     );
  //   } else if (this.state.show_itemOrder) {
  //     return (
  //       <POItemOrder
  //         onSubmit={() =>
  //           this.setState({
  //             show_itemOrder: false,
  //             show_payment: true
  //           })
  //         }
  //         onCancal={() =>
  //           this.setState({ show_itemOrder: false, show_selectGroup: true })
  //         }
  //       />
  //     );
  //   } else if (this.state.show_payment) {
  //     return (
  //       <POPayment
  //         onSubmit={() =>
  //           this.setState({ show_payment: false, show_review: true })
  //         }
  //         onCancal={() =>
  //           this.setState({ show_itemOrder: true, show_payment: false })
  //         }
  //       />
  //     );
  //   } else if (this.state.show_review) {
  //     return (
  //       <POReview
  //         onSubmit={() =>
  //           this.setState({ show_review: false, show_printing: true })
  //         }
  //         onCancal={() =>
  //           this.setState({ show_review: false, show_payment: true })
  //         }
  //       />
  //     );
  //   } else if (this.state.show_printing) {
  //     return <POPrint />;
  //   }

  //   return (
  //     <div>
  //       <POSelectGruop
  //         onSubmit={() =>
  //           this.setState({ show_selectGroup: false, show_selectSeller: true })
  //         }
  //       />
  //     </div>
  //   );
  // }

  headerCollapseItem(header) {
    return (
      <h5>
        <a href="#">{header}</a>
        <hr />
      </h5>
    );
  }

  renderContent() {
    return (
      <form onSubmit={this.props.handleSubmit(() => console.log("dd"))}>
        <div className="container">
          <h3 className="center">New Purchase Order</h3>
          <h5>
            <i>Header</i>
          </h5>
          <hr />
          <div className={PO_CSS.headerPO_con}>
            <div style={{ width: "40%" }}>
              <POSelectGruop />
            </div>
            <div style={{ width: "40%" }}>
              <POSelectSeller />
            </div>
          </div>

          <Collapsible trigger={this.headerCollapseItem("Item")}>
            <POItemOrder />
          </Collapsible>

          <Collapsible trigger={this.headerCollapseItem("Payments")}>
            <POPayment />
          </Collapsible>

          <button
            className="green btn-flat white-text"
            style={{ marginTop: "30px" }}
          >
            Next
          </button>
        </div>
      </form>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function validate(values) {
  const errors = {};
  if (!values["group_select"]) {
    errors["group_select"] = "Require a value ";
  }

  // if (!values["seller_select"]) {
  //   errors["seller_select"] = "Require a value ";
  // }
  return errors;
}

export default reduxForm({
  validate,
  form: "inbound_po"
})(
  connect(
    null,
    { fetchInbound_Group, fetchInbound_Seller }
  )(PO)
);
