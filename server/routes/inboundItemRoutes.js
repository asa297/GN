const mongoose = require("mongoose");
const itemModel = mongoose.model("items");
const requireLogin = require("../middlewares/requireLogin");
// const requirePriorityLevel1_Permission = require("../middlewares/requirePriorityLevel1_Permission");

module.exports = app => {
  app.post("/api/inbound/item", async (req, res) => {
    const {
      item_code,
      item_name,
      item_price,
      item_qty,
      item_type: { itemTypeId, itemTypeName },
      orgChinaList
    } = req.body;
    const item = await new itemModel({
      item_code,
      item_name,
      item_price,
      item_qty,
      itemTypeId,
      itemTypeName,
      orgChinaList: orgChinaList
        ? orgChinaList.map(
            ({ _id, orgTypeId, orgTypeName, orgName, orgCode, orgCom_B }) => ({
              _id,
              orgTypeId,
              orgTypeName,
              orgName,
              orgCode,
              orgCom_B
            })
          )
        : [],
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now()
    }).save();

    res.send({});
  });

  app.get("/api/inbound/item", async (req, res) => {
    const item = await itemModel.find({});

    res.send(item);
  });

  app.post("/api/inbound/item/edit/:id", async (req, res) => {
    const {
      item_code,
      item_name,
      item_price,
      item_qty,
      item_type: { itemTypeId, itemTypeName },
      orgChinaList
    } = req.body;

    await itemModel
      .updateOne(
        {
          _id: req.params.id
        },
        {
          $set: {
            item_code,
            item_name,
            item_price,
            item_qty,
            itemTypeId,
            itemTypeName,
            orgChinaList: orgChinaList
              ? orgChinaList.map(
                  ({
                    _id,
                    orgTypeId,
                    orgTypeName,
                    orgName,
                    orgCode,
                    orgCom_B
                  }) => ({
                    _id,
                    orgTypeId,
                    orgTypeName,
                    orgName,
                    orgCode,
                    orgCom_B
                  })
                )
              : [],
            RecordIdBy: req.user._id,
            RecordNameBy: req.user.firstName,
            RecordDate: Date.now()
          }
        }
      )
      .exec();

    res.send({});
  });

  app.delete("/api/inbound/item/:id", async (req, res) => {
    await itemModel.remove({ _id: req.params.id });
    const item = await itemModel.find({});

    res.send(item);
  });
};
