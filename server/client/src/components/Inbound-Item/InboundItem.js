import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchInbound_Org, deleteInbound_Item } from "../../actions";
import InboundItemList from "../Inbound-Item/InboundItemList";
import InboundItemReview from "../Inbound-Item/InboundItemReview";
import InboundItemEdit from "../Inbound-Item/InboundItemEdit";

class InboundItem extends Component {
  state = { showEdit: false, showReview: false, index: 0, _id: 0 };

  componentDidMount() {
    this.props.fetchInbound_Org();
  }

  renderInBoundList() {
    return (
      <div className="container">
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
          onDelete={item_id => this.props.deleteInbound_Item(item_id)}
        />
      </div>
    );
  }

  renderInBoundEdit() {
    return (
      <div className="container">
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
    return <div>{this.renderContent()}</div>;
  }
}

export default connect(null, {
  fetchInbound_Org,
  deleteInbound_Item
})(InboundItem);
