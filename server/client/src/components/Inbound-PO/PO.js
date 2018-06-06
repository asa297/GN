import React, { Component } from "react";
import { reduxForm, reset } from "redux-form";
import POSelectGruop from "./POSelectGruop";
import POSelectSeller from "./POSelectSeller";
import POItemOrder from "./POItemOrder";
import POPayment from "./POPayment";
import POReview from "./POReview";
import POPrint from "./POPrint";

class PO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_selectGroup: true,
      show_selectSeller: false,
      show_itemOrder: false,
      show_payment: false,
      show_review: false,
      show_printing: false
    };
  }

  componentDidMount() {
    this.props.dispatch(reset("inbound_po"));
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
          onSubmit={() =>
            this.setState({
              show_itemOrder: false,
              show_payment: true
            })
          }
          onCancal={() =>
            this.setState({ show_itemOrder: false, show_selectGroup: true })
          }
        />
      );
    } else if (this.state.show_payment) {
      return (
        <POPayment
          onSubmit={() =>
            this.setState({ show_payment: false, show_review: true })
          }
          onCancal={() =>
            this.setState({ show_itemOrder: true, show_payment: false })
          }
        />
      );
    } else if (this.state.show_review) {
      return (
        <POReview
          onSubmit={() =>
            this.setState({ show_review: false, show_printing: true })
          }
          onCancal={() =>
            this.setState({ show_review: false, show_payment: true })
          }
        />
      );
    } else if (this.state.show_printing) {
      return <POPrint />;
    }

    return (
      <div>
        <POSelectGruop
          onSubmit={() =>
            this.setState({ show_selectGroup: false, show_selectSeller: true })
          }
        />
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "inbound_po"
})(PO);
