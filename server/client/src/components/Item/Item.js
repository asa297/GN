import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetch_Item, delete_Item } from "../../actions";
import ItemList from "../Item/ItemList";
import ItemReview from "../Item/ItemReview";
import ItemEdit from "../Item/ItemEdit";
import Preloader from "../utils/Preloader";

class Item extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      showReview: false,
      index: 0,
      _id: 0,
      ready: false,
      searchTerm: ""
    };
  }

  componentDidMount() {
    this.props.fetch_Item();
  }

  componentWillReceiveProps({ items }) {
    if (items) {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    this.setState({ ready: false });
  }

  async onUpdateItem() {
    this.setState({ ready: false, showEdit: false, showReview: false });
    await this.props.fetch_Item();
    this.setState({ ready: true });
  }

  async onDeleteItem(item_id) {
    this.setState({ ready: false });
    await this.props.delete_Item(item_id);
    await this.props.fetch_Item();
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
              Product List (ผลิตภัณฑ์)
              {this.props.auth.priority === 1 ? (
                <Link
                  to="/Item/new"
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
              <label htmlFor="icon_prefix">Item Search</label>
            </div>
          </div>
        </div>
        <ItemList
          onEdit={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={item_id => this.onDeleteItem(item_id)}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }

  renderEdit() {
    return (
      <div>
        <ItemEdit
          onCancal={() => this.setState({ showEdit: false, index: 0 })}
          _id={this.state._id}
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
        <ItemReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateItem={() => this.onUpdateItem()}
          item_id={this.state._id}
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

function mapStateToProps({ items, auth }) {
  return { items, auth };
}

export default connect(
  mapStateToProps,
  {
    fetch_Item,
    delete_Item
  }
)(Item);
