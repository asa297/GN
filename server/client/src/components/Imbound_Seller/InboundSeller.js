import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteInbound_Seller } from "../../actions";
import InboundGroupList from "../Imbound_Seller/InboundSellerList";
import InboundSellerReview from "../Imbound_Seller/InboundSellerReview";
import InboundSellerEdit from "../Imbound_Seller//InboundSellerEdit";

class InboundSeller extends Component {
  state = { showEdit: false, showReview: false, index: 0, _id: 0 };

  renderInBoundList() {
    return (
      <div className="container">
        <h3>
          InBound-Seller
          <Link
            to="/inboundseller/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </h3>
        <InboundGroupList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={seller_id => this.props.deleteInbound_Seller(seller_id)}
        />
      </div>
    );
  }

  renderInBoundEdit() {
    return (
      <div className="container">
        <InboundSellerEdit
          onCancal={() => this.setState({ showEdit: false, index: 0 })}
          index={this.state.index}
          onSubmit={() => this.setState({ showEdit: false, showReview: true })}
        />
      </div>
    );
  }

  renderContent() {
    if (this.state.showEdit) {
      return this.renderInBoundEdit();
    } else if (this.state.showReview) {
      return (
        <InboundSellerReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateSeller={() =>
            this.setState({ showEdit: false, showReview: false })
          }
          seller_id={this.state._id}
        />
      );
    }

    return this.renderInBoundList();
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default connect(null, {
  deleteInbound_Seller
})(InboundSeller);
