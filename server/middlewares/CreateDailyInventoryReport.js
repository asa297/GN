const _ = require("lodash");
module.exports = ({ inbound, outbound }) => {
  const _unionArray = _.unionBy(inbound, outbound);
  const _ItemCodeArray = _.uniqBy(_unionArray, e => {
    return e.item_code;
  });

  const result = _.map(_ItemCodeArray, ({ item_code, item_name }) => {
    const _Inbound = _.filter(_unionArray, e => {
      return e.item_code === item_code && e.stock_type === 1;
    });
    const _Outbound = _.filter(_unionArray, e => {
      return e.item_code === item_code && e.stock_type === 2;
    });
    const _Sold = _.filter(_unionArray, e => {
      return e.item_code === item_code && e.stock_type === 3;
    });

    const _Remain = _.maxBy(
      _.filter(_unionArray, value => {
        return value.item_code === item_code;
      }),
      e => {
        return e.RecordDate;
      }
    );

    return {
      item_code,
      item_name,
      Inbound: _.sumBy(_Inbound, "item_qty"),
      Outbound: _.sumBy(_Outbound, "item_qty"),
      Sold: _.sumBy(_Sold, "item_qty"),
      Remain: _Remain.item_remain
    };
  });

  return result;
};
