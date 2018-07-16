const _ = require("lodash");
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
      remarks: "Deposit Inventory",
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now()
    }).save();

    res.status(200).send({});
  });

  app.post("/api/itemelement/outbound", requireLogin, async (req, res) => {
    const { item_code, item_name, outbound_qty } = req.body;

    const itemelement = await new itemElementsModel({
      item_code,
      item_name,
      stock_type: 2,
      stock_typeName: "Outbound",
      item_qty: outbound_qty,
      remarks: "Withdraw Invertory",
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now()
    }).save();

    res.status(200).send({});
  });

  app.post("/api/itemelement/outbound/po", requireLogin, async (req, res) => {
    const { itemList } = req.body;
    _.map(itemList, async ({ item_code, item_name, countQty }) => {
      await new itemElementsModel({
        item_code,
        item_name,
        stock_type: 2,
        stock_typeName: "Outbound",
        item_qty: countQty,
        remarks: "Purchase Order",
        RecordIdBy: req.user._id,
        RecordNameBy: req.user.firstName,
        RecordDate: Date.now()
      }).save();
    });

    res.status(200).send({});
  });

  app.get("/api/itemelement/inbound", requireLogin, async (req, res) => {
    const itemelement = await itemElementsModel.find({
      stock_type: 1,
      RecordDate: {
        $gte: new Date(
          moment()
            .add(-7, "days")
            .format("YYYY-MM-DD")
        )
      }
    });

    res.send(itemelement);
  });

  app.get("/api/itemelement/outbound", requireLogin, async (req, res) => {
    const itemelement = await itemElementsModel.find({
      stock_type: 2,
      RecordDate: {
        $gte: new Date(
          moment()
            .add(-7, "days")
            .format("YYYY-MM-DD")
        )
      }
    });

    res.send(itemelement);
  });

  app.post(
    "/api/itemelement/inbound/filter",
    requireLogin,
    async (req, res) => {
      const { start_date, end_date } = req.body;

      const itemelement = await itemElementsModel.find({
        stock_type: 1,
        RecordDate: {
          $gte: new Date(moment(start_date).format("YYYY-MM-DD HH:mm:ss")),
          $lt: new Date(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
        }
      });
      res.send(itemelement);
    }
  );

  app.post(
    "/api/itemelement/outbound/filter",
    requireLogin,
    async (req, res) => {
      const { start_date, end_date } = req.body;

      const itemelement = await itemElementsModel.find({
        stock_type: 2,
        RecordDate: {
          $gte: new Date(moment(start_date).format("YYYY-MM-DD HH:mm:ss")),
          $lt: new Date(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
        }
      });
      res.send(itemelement);
    }
  );

  app.post("/api/itemelement/daily/filter", requireLogin, async (req, res) => {
    const { start_date, end_date } = req.body;

    const itemelement = await itemElementsModel.find({
      stock_type: 2,
      RecordDate: {
        $gte: new Date(moment(start_date).format("YYYY-MM-DD HH:mm:ss")),
        $lt: new Date(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
      }
    });
    res.send(itemelement);
  });
};
