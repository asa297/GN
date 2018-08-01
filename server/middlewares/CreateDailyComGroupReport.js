const _ = require("lodash");

module.exports = order => {
  const _Group = _.uniqBy(order, e => {
    return e.groupId.toString();
  });

  const result = _.map(_Group, ({ groupId, groupCode, orgCom }) => {
    const _PO = _.filter(order, ({ groupId: _groupId }) => {
      return groupId.toString() === _groupId.toString();
    });

    const _grandtotal = _.sumBy(_PO, ({ grandtotal }) => {
      return grandtotal;
    });

    const _calorgCom = _grandtotal * (orgCom / 100);

    return {
      Grandtotal: _grandtotal,
      OrgCom: orgCom,
      Com: _calorgCom
    };
  });

  return result;
};
