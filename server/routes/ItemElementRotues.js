const mongoose = require("mongoose");
const moment = require("moment");
const itemElementsModel = mongoose.model("ItemElements");
const requireLogin = require("../middlewares/requireLogin");
// const requirePriorityLevel1_Permission = require("../middlewares/requirePriorityLevel1_Permission");

module.exports = app => {
  app.post("/api/itemelement/inbound", requireLogin, async (req, res) => {
    const { item_code, item_name, inbound_qty } = req.body;

    const itemelement = await new itemElementsModel({
      item_code,
      item_name,
      stock_type: 1,
      stock_typeName: "Inbound",
      item_qty: inbound_qty,
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now()
    }).save();

    res.status(200).send({});
  });

  app.get("/api/itemelement/inbound", requireLogin, async (req, res) => {
    const itemelement = await itemElementsModel.find({ stock_type: 1 });
    res.send(itemelement);
  });
};
