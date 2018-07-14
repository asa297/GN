import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchInbound_Seller, deleteInbound_Seller } from "../../actions";
import InboundGroupList from "../Inbound-Seller/InboundSellerList";
import InboundSellerReview from "../Inbound-Seller/InboundSellerReview";
import InboundSellerEdit from "../Inbound-Seller/InboundSellerEdit";
import Preloader from "../utils/Preloader";

class InboundSeller extends Component {
  state = {
    showEdit: false,
    showReview: false,
    index: 0,
    _id: 0,
    ready: false
  };

  componentDidMount() {
    this.props.fetchInbound_Seller();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sellers) {
      this.setState({ ready: true });
    }
  }

  renderInBoundList() {
    return (
      <div>
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
      <div>
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
    return (
      <div className="container">
        {this.state.ready ? this.renderContent() : <Preloader />}
      </div>
    );
  }
}

function mapStateToProps({ sellers }) {
  return { sellers };
}

export default connect(
  mapStateToProps,
  {
    fetchInbound_Seller,
    deleteInbound_Seller
  }
)(InboundSeller);
