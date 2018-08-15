const _ = require("lodash");

module.exports = (order, select_date) => {
  const _Group = _.uniqBy(order, e => {
    return e.group.groupId.toString();
  });

  const result = _.map(
    _Group,
    ({
      org: { orgName },
      org: { orgCode },
      org: { orgCom },
      group: { guideName },
      group: { groupId },
      group: { groupCode },
      group: { groupStickerNumber }
    }) => {
      const _PO = _.filter(order, ({ group: { groupId: _groupId } }) => {
        return groupId.toString() === _groupId.toString();
      });

      const _grandtotal = _.sumBy(_PO, ({ grandtotal }) => {
        return grandtotal;
      });

      const _calorgCom = _grandtotal * (orgCom / 100);

      return {
        OrgName: orgName,
        OrgCode: orgCode,
        Date: select_date,
        GuideName: guideName,
        GroupId: groupId,
        GroupCode: groupCode,
        GroupStickerNumber: groupStickerNumber,
        Grandtotal: _grandtotal,
        OrgCom: orgCom,
        Com: _calorgCom
      };
    }
  );

  return result;
};
