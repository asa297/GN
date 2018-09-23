import React, { Component } from "react";
import _ from "lodash";

class List extends Component {
  constructor(props) {
    super(props);

    const { ItemList } = props.print_value;

    this.state = { ItemList };
  }

  RunNumberColumn() {
    return (
      <div
        style={{
          width: "5%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 0px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ _id }, index) => {
          return (
            <div key={_id} style={{ fontSize: "13px" }}>
              {index + 1}
            </div>
          );
        })}
      </div>
    );
  }

  FactoryItemColumn() {
    return (
      <div
        style={{
          width: "10%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 0px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ item_factory, _id }) => {
          return (
            <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
              {item_factory}
            </div>
          );
        })}
      </div>
    );
  }

  ItemCodeColumn() {
    return (
      <div
        style={{
          width: "10%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 0px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ item_code, _id }) => {
          return (
            <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
              {item_code}
            </div>
          );
        })}
      </div>
    );
  }

  ItemNameColumn() {
    return (
      <div
        style={{
          width: "25%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 0px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ item_name, _id }) => {
          return (
            <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
              {item_name}
            </div>
          );
        })}
      </div>
    );
  }

  ItemSkinColumn() {
    return (
      <div
        style={{
          width: "10%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 0px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ item_skin, _id }) => {
          return (
            <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
              {item_skin}
            </div>
          );
        })}
      </div>
    );
  }

  ItemColorColumn() {
    return (
      <div
        style={{
          width: "10%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 0px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ item_color, _id }) => {
          return (
            <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
              {item_color}
            </div>
          );
        })}
      </div>
    );
  }

  ItemQTYColumn() {
    return (
      <div
        style={{
          width: "10%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 0px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ qty, _id }) => {
          return (
            <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
              {qty}
            </div>
          );
        })}
      </div>
    );
  }

  ItemRemarkColumn() {
    return (
      <div
        style={{
          width: "20%",
          height: this.state.ItemList.length * 25,
          borderStyle: "solid",
          borderWidth: "2px 2px 2px 2px",
          textAlign: "center"
        }}
      >
        {_.map(this.state.ItemList, ({ remarks, _id }) => {
          return (
            <div key={_id} style={{ marginLeft: "5px", fontSize: "13px" }}>
              {remarks}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        {this.RunNumberColumn()}
        {this.FactoryItemColumn()}
        {this.ItemCodeColumn()}
        {this.ItemNameColumn()}
        {this.ItemSkinColumn()}
        {this.ItemColorColumn()}
        {this.ItemQTYColumn()}
        {this.ItemRemarkColumn()}
      </div>
    );
  }
}

export default List;
