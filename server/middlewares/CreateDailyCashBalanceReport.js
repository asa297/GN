const _ = require("lodash");

module.exports = order => {
  const _RecordIdByArray = _.uniqBy(order, e => {
    return e.RecordIdBy.toString();
  });

  const result = _.map(_RecordIdByArray, ({ RecordIdBy, RecordNameBy }) => {
    const _PO = _.filter(order, ({ RecordIdBy: _RecordIdBy }) => {
      return RecordIdBy.toString() === _RecordIdBy.toString();
    });

    const _Total = _.sumBy(_PO, ({ total }) => {
      return total;
    });
    const _Cash = _.sumBy(_PO, ({ cash }) => {
      return cash;
    });
    const _Discount = _.sumBy(_PO, ({ discount }) => {
      return discount;
    });
    const _Credit = _.sumBy(_PO, ({ credit }) => {
      return credit;
    });
    const _Creditcharge = _.sumBy(_PO, ({ creditcharge }) => {
      return creditcharge;
    });
    const _Grandtotal = _.sumBy(_PO, ({ grandtotal }) => {
      return grandtotal;
    });
    const _Receivecash = _.sumBy(_PO, ({ receivecash }) => {
      return receivecash;
    });
    const _Changecash = _.sumBy(_PO, ({ changecash }) => {
      return changecash;
    });

    return {
      RecordNameBy,
      Total: new Number(_Total),
      Cash: new Number(_Cash),
      Discount: new Number(_Discount),
      Credit: new Number(_Credit),
      Creditcharge: new Number(_Creditcharge),
      Grandtotal: new Number(_Grandtotal),
      Receivecash: new Number(_Receivecash),
      Changecash: new Number(_Changecash)
    };
  });

  return result;
};
