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

  componentWillReceiveProps({ sellers }) {
    if (sellers) {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    this.setState({ ready: false });
  }

  async onUpdateSeller() {
    this.setState({ ready: false, showEdit: false, showReview: false });
    await this.props.fetch_Seller();
    this.setState({ ready: true });
  }

  async onDeleteSeller(seller_id) {
    this.setState({ ready: false });
    await this.props.delete_Seller(seller_id);
    await this.props.fetch_Seller();
    this.setState({ ready: true });
  }

  renderList() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          <div style={{ width: "60%" }}>
            <h5 style={{ margin: "0px" }}>
              Seller List (พนักงานขาย)
              {this.props.auth.priority === 1 ? (
                <Link
                  to="/Seller/new"
                  className="btn-small blue"
                  style={{ marginLeft: "20px" }}
                >
                  <i className="material-icons">add</i>
                </Link>
              ) : null}
            </h5>
          </div>
          <div style={{ width: "40%", display: "flex", alignItems: "center" }}>
            <div
              className="input-field"
              style={{ width: "100%", margin: "0px" }}
            >
              <i className="material-icons prefix">search</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                style={{ marginBottom: "0px" }}
                onChange={event => {
                  this.setState({ searchTerm: event.target.value });
                }}
              />
              <label htmlFor="icon_prefix">Seller Search</label>
            </div>
          </div>
        </div>
        <SellerList
          onEdit={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={seller_id => this.onDeleteSeller(seller_id)}
          searchTerm={this.state.searchTerm}
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
          onUpdateSeller={() => this.onUpdateSeller()}
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

function mapStateToProps({ sellers, auth }) {
  return { sellers, auth };
}

export default connect(
  mapStateToProps,
  {
    fetch_Seller,
    delete_Seller
  }
)(Seller);
