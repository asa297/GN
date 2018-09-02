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
      org: { orgComA, orgComB },
      group: { guideName },
      group: { groupId },
      group: { groupCode },
      group: { groupStickerNumber }
    }) => {
      const _PO = _.filter(order, ({ group: { groupId: _groupId } }) => {
        return groupId.toString() === _groupId.toString();
      });

      _.map(_PO, ({ itemList: { itemTypeId } }) => {
        

      });

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
