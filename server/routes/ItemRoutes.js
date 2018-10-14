const mongoose = require("mongoose");
const moment = require("moment");
const itemModel = mongoose.model("items");
const requireLogin = require("../middlewares/requireLogin");
// const requirePriorityLevel1_Permission = require("../middlewares/requirePriorityLevel1_Permission");

module.exports = app => {

  // app.post("/api/item", requireLogin, async (req, res) => {
  //   const {
  //     item_code,
  //     item_name,
  //     item_factory,
  //     item_color,
  //     item_skin,
  //     item_price,
  //     item_remarks,
  //     item_type: { itemTypeId, itemTypeName },
  //     image
  //   } = req.body;

  //   const found = await itemModel.findOne({
  //     item_code
  //   });

  //   if (!found) {
  //     await itemModel({
  //       item_code,
  //       item_name,
  //       item_factory: item_factory ? item_factory : "",
  //       item_color: item_color ? item_color : "",
  //       item_skin: item_skin ? item_skin : "",
  //       item_price,
  //       item_qty: 0,
  //       item_qty_PTY: 0,
  //       item_remarks: item_remarks ? item_remarks : "",
  //       itemTypeId,
  //       itemTypeName,
  //       image: image ? image : null,
  //       RecordIdBy: req.user._id,
  //       RecordNameBy: req.user.firstName,
  //       RecordDate: Date.now(),
  //       LastModifyById: req.user._id,
  //       LastModifyByName: req.user.firstName,
  //       LastModifyDate: Date.now()
  //     }).save();

  //     res.send({});
  //   } else {
  //     res.status(403).send();
  //   }
  // });

  app.get("/api/item", requireLogin, async (req, res) => {
    // const item = await itemModel.find({});
    const item = await itemModel.find({}, { item_qty: 0 });

    res.send(item);
  });

  app.post("/api/item/edit/:id", requireLogin, async (req, res) => {
    const {
      // item_code,
      item_name,
      item_factory,
      item_color,
      item_skin,
      item_price,
      item_remarks,
      item_type: { itemTypeId, itemTypeName },
      image
    } = req.body;
    const { priority } = req.user;
    switch (priority) {
      case 1: 
          await itemModel
          .updateOne(
            {
              _id: req.params.id
            },
            {
              $set: {
                // item_code,
                item_name,
                item_factory: item_factory ? item_factory : "",
                item_color: item_color ? item_color : "",
                item_skin: item_skin ? item_skin : "",
                item_price,
                item_remarks: item_remarks ? item_remarks : "",
                itemTypeId,
                itemTypeName,
                image: image ? image : null,
                LastModifyById: req.user._id,
                LastModifyByName: req.user.firstName,
                LastModifyDate: Date.now()
              }
            }
          )
          .exec();

        res.send();
        break;
      default:
        res.status(401).send();
        break;
    }


  });

  // app.delete("/api/item/:id", requireLogin, async (req, res) => {
  //   await itemModel.findByIdAndRemove(req.params.id);

  //   res.send();
  // });

  app.get("/api/item/:item_code", requireLogin, async (req, res) => {
    const item = await itemModel.findOne({ item_code: req.params.item_code }, { item_qty: 0 });
    res.send(item);
  });

  app.put("/api/item/stock/:id", requireLogin, async (req, res) => {
    const { qty, stock_status } = req.body;
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:   
        await itemModel
          .updateOne(
            {
              _id: req.params.id
            },
            { $inc: { item_qty_PTY: stock_status === 1 ? qty : qty * -1 } },
            {
              $set: {
                LastModifyById: req.user._id,
                LastModifyByName: req.user.firstName,
                LastModifyDate: Date.now()
              }
            }
          )
          .exec();

        res.send();
        break;
      default:
        res.status(401).send();
        break;
    }

  });
};
