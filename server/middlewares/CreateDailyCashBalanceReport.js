const _ = require("lodash");
module.exports = order => {
  const _RecordIdByArray = _.uniqBy(order, e => {
    return e.RecordIdBy;
  });
  console.log(_RecordIdByArray);

  return null;
};
