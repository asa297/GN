import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchInbound_Item,
  delete_Item,
  fetchInbound_Org
} from "../../actions";
import InboundItemList from "../Inbound-Item/InboundItemList";
import InboundItemReview from "../Inbound-Item/InboundItemReview";
import InboundItemEdit from "../Inbound-Item/InboundItemEdit";
import Preloader from "../utils/Preloader";

class InboundItem extends Component {
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
    this.props.fetchInbound_Item();
    this.props.fetchInbound_Org();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items) {
      this.setState({ ready: true });
    }
  }

  renderInBoundList() {
    return (
      <div>
        <h3>
          InBound-Item
          <Link
            to="/inbounditem/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </h3>
        <InboundItemList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={item_id => this.props.delete_Item(item_id)}
        />
      </div>
    );
  }

  renderInBoundEdit() {
    return (
      <div>
        <InboundItemEdit
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
      return this.renderInBoundEdit();
    } else if (this.state.showReview) {
      return (
        <InboundItemReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateItem={() =>
            this.setState({ showEdit: false, showReview: false })
          }
          item_id={this.state._id}
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

function mapStateToProps({ items }) {
  console.log(items);
  return { items };
}

export default connect(
  mapStateToProps,
  {
    fetchInbound_Item,
    fetchInbound_Org,
    delete_Item
  }
)(InboundItem);
