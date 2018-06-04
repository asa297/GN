import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

const aa = ({ inbound_reports_po }) => {
  const a = _.map(inbound_reports_po, ({ itemList }) => {
    return itemList;
  });

  console.log(a);

  //   const b = _.map(a , ({}) =>{

  //   })
};

const Result = ({ inbound_reports_po }) => {
  const a = _.map(inbound_reports_po, ({ itemList }) => {
    return itemList;
  });
  console.log(a);

  const b = _.map(
    _.map(inbound_reports_po, ({ itemList }) => {
      return itemList;
    }),
    value => {
      return _.map(value, ({ item_qty, countQty, item_code }) => {
        return {
          item_code,
          SumCountQty: _.sumBy(
            _.filter(value, value => {
              return value.item_code === item_code;
            }),
            ({ countQty }) => {
              return countQty;
            }
          ),
          MaxQty: item_qty
        };
      });
      // return _.sumBy(value, function({ item_qty, countQty, item_code }) {
      //   return { countQty, item_code };
      // });
    }
  );

  console.log(b);

  return <div>gg</div>;
};

function mapStateToProps({ inbound_reports_po }) {
  return { inbound_reports_po };
}

export default connect(mapStateToProps)(Result);
