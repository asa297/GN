import React, { Component } from "react";
import Item from "./Item/Item";
class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { itemList } = this.props.print_value;
    this.setState({ itemList });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "90%" }}>
          <Item itemList={this.state.itemList} />
        </div>
      </div>
    );
  }
}

export default Content;
