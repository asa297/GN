const mongoose = require("mongoose");
const _ = require("lodash");
const moment = require("moment");
const orderModel = mongoose.model("orders");
const itemModel = mongoose.model("items");
const CreateDailyCashBalanceReport = require("../middlewares/CreateDailyCashBalanceReport");

module.exports = app => {
  app.post("/api/order", async (req, res) => {
    const {
      group_select,
      seller_select,
      itemList,
      total,
      discount,
      credit,
      creditcharge,
      receivecash,
      changecash,
      grandtotal,
      cash
    } = req.body;

    const orderId = Date.now();

    const order = await orderModel({
      orderId,
      groupId: group_select._id,
      groupCode: group_select.groupCode,
      guideName: group_select.guideName,
      orgId: group_select.orgId,
      orgName: group_select.orgName,
      orgTypeId: group_select.orgTypeId,
      orgTypeName: group_select.orgTypeName,
      orgCode: group_select.orgCode,
      orgCom: group_select.orgCom,
      sellerId: seller_select._id,
      sellerName: seller_select.sellerName,
      sellerCom: seller_select.sellerCom,
      itemList,
      total,
      discount,
      credit,
      creditcharge,
      cash,
      receivecash,
      changecash,
      grandtotal,
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now(),
      LastModifyById: req.user._id,
      LastModifyByName: req.user.firstName,
      LastModifyDate: Date.now()
    }).save();

    if (order) {
      // ตัดสต็อกได้แล้วแต่ ขก ไปเพิ่มสินค้าทีหลัง
      _.map(itemList, async ({ _id, countQty }) => {
        await itemModel
          .updateOne({ _id }, { $inc: { item_qty: countQty * -1 } })
          .exec();
      });

      res.send(order);
    } else {
      res.status(400).send({ error: "Order is not success" });
    }
  });

  app.get("/api/order", async (req, res) => {
    const order = await orderModel.find({
      RecordDate: {
        $gte: new Date(
          moment()
            .add(-7, "days")
            .format("YYYY-MM-DD HH:mm:ss")
        )
      }
    });

    res.send(order);
  });

  app.post("/api/order/filter", async (req, res) => {
    const { start_date, end_date } = req.body;

    const order = await orderModel.find({
      RecordDate: {
        $gte: new Date(moment(start_date).format("YYYY-MM-DD HH:mm:ss")),
        $lt: new Date(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
      }
    });

    res.send(order);
  });

  app.post("/api/order/edit/:id", async (req, res) => {
    const {
      groupCode,
      guideName,
      orgName,
      orgTypeName,
      orgCom,
      sellerName,
      sellerCom,
      total,
      discount,
      credit,
      cash,
      receivecash,
      changecash
    } = req.body;

    await orderModel
      .updateOne(
        {
          orderId: req.params.id
        },
        {
          $set: {
            groupCode,
            guideName,
            orgName,
            orgTypeName,
            orgCom,
            sellerName,
            sellerCom,
            total,
            discount,
            credit,
            cash,
            receivecash,
            changecash,
            LastModifyById: req.user._id,
            LastModifyByName: req.user.firstName,
            LastModifyDate: Date.now()
          }
        }
      )
      .exec();

    res.send({});
  });

  app.delete("/api/order/:id", async (req, res) => {
    await orderModel.remove({ orderId: req.params.id });

    res.send({});
  });

  app.get("/api/order/:orderId", async (req, res) => {
    const item = await orderModel.findOne({ orderId: req.params.orderId });

    res.send(item);
  });

  app.post("/api/order/daily/filter", async (req, res) => {
    const { select_date } = req.body;

    const order = await orderModel.find({
      RecordDate: {
        $gte: new Date(moment(select_date).format("YYYY-MM-DD HH:mm:ss")),
        $lt: new Date(
          moment(select_date)
            .add(1, "days")
            .format("YYYY-MM-DD HH:mm:ss")
        )
      }
    });

    CreateDailyCashBalanceReport(order);

    res.send();
  });
};
