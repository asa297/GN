import _ from "lodash";

function resultOutboundInventory(reports_po) {
  let result_array = [];
  // const a = _.map(reports_po, ({ itemList }) => {
  //   return itemList;
  // });

  const temp_result = _.map(
    _.map(reports_po, ({ itemList }) => {
      return itemList;
    }),
    value => {
      return _.map(value, ({ item_qty, countQty, item_code, item_name }) => {
        return {
          item_code,
          item_name,
          countQty: _.sumBy(
            _.filter(value, value => {
              return value.item_code === item_code;
            }),
            ({ countQty }) => {
              return countQty;
            }
          ),
          item_qty
        };
      });
    }
  );

  _.map(temp_result, value => {
    return _.map(value, value1 => {
      result_array.push(value1);
    });
  });

  const list_uniq_itemCode = _.uniqBy(result_array, "item_code");

  const result = _.map(
    list_uniq_itemCode,
    ({ item_code, item_name }, index) => {
      return {
        index,
        item_code,
        item_name,
        sold: _.sumBy(
          _.filter(result_array, temp => {
            return temp.item_code === item_code;
          }),
          "countQty"
        ),
        QTY: _.maxBy(
          _.filter(result_array, temp => {
            return temp.item_code === item_code;
          }),
          "item_qty"
        ),
        remainQTY:
          _.maxBy(
            _.filter(result_array, temp => {
              return temp.item_code === item_code;
            }),
            "item_qty"
          ).item_qty -
          _.sumBy(
            _.filter(result_array, temp => {
              return temp.item_code === item_code;
            }),
            "countQty"
          )
      };
    }
  );

  return result;
}

export default resultOutboundInventory;
