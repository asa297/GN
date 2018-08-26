const mongoose = require("mongoose");
const moment = require("moment");
const itemModel = mongoose.model("items");
const requireLogin = require("../middlewares/requireLogin");
// const requirePriorityLevel1_Permission = require("../middlewares/requirePriorityLevel1_Permission");

module.exports = app => {
  app.post("/api/item", requireLogin, async (req, res) => {
    const {
      item_code,
      item_name,
      item_factory,
      item_color,
      item_skin,
      item_price,
      item_qty,
      item_remarks,
      item_type: { itemTypeId, itemTypeName }
      // orgChinaList
    } = req.body;

    const item = await new itemModel({
      item_code,
      item_name,
      item_factory: item_factory ? item_factory : "",
      item_color: item_color ? item_color : "",
      item_skin: item_skin ? item_skin : "",
      item_price,
      item_qty,
      item_remarks: item_remarks ? item_remarks : "",
      itemTypeId,
      itemTypeName,
      // orgChinaList: orgChinaList
      //   ? orgChinaList.map(
      //       ({ _id, orgTypeId, orgTypeName, orgName, orgCode, orgCom_B }) => ({
      //         _id,
      //         orgTypeId,
      //         orgTypeName,
      //         orgName,
      //         orgCode,
      //         orgCom_B
      //       })
      //     )
      //   : [],
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now(),
      LastModifyById: req.user._id,
      LastModifyByName: req.user.firstName,
      LastModifyDate: Date.now()
    }).save();

    res.send({});
  });

  app.get("/api/item", requireLogin, async (req, res) => {
    const item = await itemModel.find({});

    res.send(item);
  });

  app.post("/api/item/edit/:id", requireLogin, async (req, res) => {
    const {
      item_code,
      item_name,
      item_factory,
      item_color,
      item_skin,
      item_price,
      item_qty,
      item_remarks,
      item_type: { itemTypeId, itemTypeName }
      // orgChinaList
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
            item_factory: item_factory ? item_factory : "",
            item_color: item_color ? item_color : "",
            item_skin: item_skin ? item_skin : "",
            item_price,
            item_qty,
            item_remarks: item_remarks ? item_remarks : "",
            itemTypeId,
            itemTypeName,
            // orgChinaList: orgChinaList
            //   ? orgChinaList.map(
            //       ({
            //         _id,
            //         orgTypeId,
            //         orgTypeName,
            //         orgName,
            //         orgCode,
            //         orgCom_B
            //       }) => ({
            //         _id,
            //         orgTypeId,
            //         orgTypeName,
            //         orgName,
            //         orgCode,
            //         orgCom_B
            //       })
            //     )
            //   : [],
            // RecordIdBy: req.user._id,
            // RecordNameBy: req.user.firstName,
            // RecordDate: Date.now(),
            LastModifyById: req.user._id,
            LastModifyByName: req.user.firstName,
            LastModifyDate: Date.now()
          }
        }
      )
      .exec();

    res.status(200).send();
  });

  app.delete("/api/item/:id", requireLogin, async (req, res) => {
    await itemModel.findByIdAndRemove(req.params.id);
    const item = await itemModel.find({});

    res.send(item);
  });

  app.get("/api/item/:item_code", requireLogin, async (req, res) => {
    const item = await itemModel.findOne({ item_code: req.params.item_code });

    res.send(item);
  });
};
