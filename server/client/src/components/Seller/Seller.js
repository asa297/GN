import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetch_Seller, delete_Seller } from "../../actions";
import SellerList from "./SellerList";
import SellerReview from "./SellerReview";
import SellerEdit from "./SellerEdit";
import Preloader from "../utils/Preloader";

class Seller extends Component {
  state = {
    showEdit: false,
    showReview: false,
    index: 0,
    _id: 0,
    ready: false
  };

  componentDidMount() {
    this.props.fetch_Seller();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sellers) {
      this.setState({ ready: true });
    }
  }

  renderList() {
    return (
      <div>
        <h3>
          InBound-Seller
          <Link
            to="/Seller/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </h3>
        <SellerList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={seller_id => this.props.delete_Seller(seller_id)}
        />
      </div>
    );
  }

  renderEdit() {
    return (
      <div>
        <SellerEdit
          onCancal={() => this.setState({ showEdit: false, index: 0 })}
          index={this.state.index}
          onSubmit={() => this.setState({ showEdit: false, showReview: true })}
        />
      </div>
    );
  }

  renderContent() {
    if (this.state.showEdit) {
      return this.renderEdit();
    } else if (this.state.showReview) {
      return (
        <SellerReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateSeller={() =>
            this.setState({ showEdit: false, showReview: false })
          }
          seller_id={this.state._id}
        />
      );
    }

    return this.renderList();
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
    fetch_Seller,
    delete_Seller
  }
)(Seller);
