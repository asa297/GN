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
      group: { guideName },
      group: { groupId },
      group: { groupCode },
      group: { groupStickerNumber }
    }) => {
      const _PO = _.filter(order, ({ group: { groupId: _groupId } }) => {
        return groupId.toString() === _groupId.toString();
      });

      const resultCom = _.map(
        _PO,
        ({ itemList, org: { orgComA, orgComB }, discountPercent }) => {
          const itemListA = _.filter(
            itemList,
            ({ itemTypeId, itemTypeName }) => {
              return itemTypeId === 1 && itemTypeName === "A";
            }
          );
          const itemListB = _.filter(
            itemList,
            ({ itemTypeId, itemTypeName }) => {
              return itemTypeId === 2 && itemTypeName === "B";
            }
          );

          const total_itemListA = _.sumBy(
            itemListA,
            ({ item_price, countQty }) => {
              return item_price * countQty;
            }
          );

          const total_itemListB = _.sumBy(
            itemListB,
            ({ item_price, countQty }) => {
              return item_price * countQty;
            }
          );

          const discount_itemListA = total_itemListA * (discountPercent / 100);
          const discount_itemListB = total_itemListB * (discountPercent / 100);

          const grandtotal_itemListA = total_itemListA - discount_itemListA;
          const grandtotal_itemListB = total_itemListB - discount_itemListB;

          const com_itemListA = grandtotal_itemListA * (orgComA / 100);
          orgComB !== 0 ? orgComB : orgComA;
          const com_itemListB = grandtotal_itemListB * (orgComB / 100);

          return {
            total_itemListA,
            discount_itemListA,
            grandtotal_itemListA,
            orgComA,
            com_itemListA,
            total_itemListB,
            discount_itemListB,
            grandtotal_itemListB,
            orgComB,
            com_itemListB
          };
        }
      );

      const totalA = _.sumBy(resultCom, "total_itemListA");
      const totalB = _.sumBy(resultCom, "total_itemListB");

      const discountA = _.sumBy(resultCom, "discount_itemListA");
      const discountB = _.sumBy(resultCom, "discount_itemListB");

      const grandtotalComA = _.sumBy(resultCom, "grandtotal_itemListA");
      const grandtotalComB = _.sumBy(resultCom, "grandtotal_itemListB");

      const ComA = _.sumBy(resultCom, "com_itemListA");
      const ComB = _.sumBy(resultCom, "com_itemListB");

      return {
        OrgName: orgName,
        OrgCode: orgCode,
        Date: select_date,
        GuideName: guideName,
        GroupId: groupId,
        GroupCode: groupCode,
        GroupStickerNumber: groupStickerNumber,
        _PO,
        totalA,
        totalB,
        discountA,
        discountB,
        grandtotalComA,
        grandtotalComB,
        ComA,
        ComB
      };
    }
  );

  return result;
};
