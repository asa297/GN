import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetch_Item, delete_Item, fetch_Org } from "../../actions";
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
      ready: false
    };
  }

  componentDidMount() {
    this.props.fetch_Item();
    this.props.fetch_Org();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items) {
      this.setState({ ready: true });
    }
  }

  renderList() {
    return (
      <div>
        <h3>
          InBound-Item
          <Link
            to="/Item/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </h3>
        <ItemList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={item_id => this.props.delete_Item(item_id)}
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
          onUpdateItem={() =>
            this.setState({ showEdit: false, showReview: false })
          }
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

function mapStateToProps({ items }) {
  return { items };
}

export default connect(
  mapStateToProps,
  {
    fetch_Item,
    fetch_Org,
    delete_Item
  }
)(Item);
