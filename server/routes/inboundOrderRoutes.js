const mongoose = require("mongoose");
const _ = require("lodash");
const moment = require("moment");
const orderModel = mongoose.model("orders");
const itemModel = mongoose.model("items");

module.exports = app => {
  app.post("/api/inbound/order", async (req, res) => {
    const {
      group_select,
      seller_select,
      itemList,
      total,
      discount,
      credit,
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
      cash,
      receivecash,
      changecash,
      grandtotal,
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now()
    }).save();

    console.log(moment().toDate());

    if (order._id) {
      // ตัดสต็อกได้แล้วแต่ ขก ไปเพิ่มสินค้าทีหลัง
      // _.map(itemList, async ({ _id, countQty }) => {
      //   await itemModel
      //     .updateOne({ _id }, { $inc: { item_qty: countQty * -1 } })
      //     .exec();
      // });
      res.send({ orderId });
    } else {
      res.status(400).send({ error: "Order is not success" });
    }
  });

  app.get("/api/inbound/order", async (req, res) => {
    const order = await orderModel.find({});

    res.send(order);
  });

  app.post("/api/inbound/order_filter", async (req, res) => {
    const { start_date, end_date } = req.body;

    const order = await orderModel.find({
      RecordDate: {
        $gte: new Date(moment(start_date).format("YYYY-MM-DD")),
        $lt: new Date(moment(end_date).format("YYYY-MM-DD"))
      }
    });

    res.send(order);
  });

  // app.post(
  //   "/api/inbound/org/edit/:id",
  //   requirePriorityLevel1_Permission,
  //   async (req, res) => {
  //     await organizationModel
  //       .updateOne(
  //         {
  //           _id: req.params.id
  //         },
  //         {
  //           $set: {
  //             orgTypeId: req.body.org_type.org_typeId,
  //             orgTypeName: req.body.org_type.org_typeName,
  //             orgName: req.body.org_name,
  //             orgCom: req.body.org_com,
  //             orgCode: req.body.org_code,
  //             RecordIdBy: req.user._id,
  //             RecordNameBy: req.user.firstName,
  //             RecordDate: Date.now()
  //           }
  //         }
  //       )
  //       .exec();

  //     res.send({});
  //   }
  // );

  // app.delete(
  //   "/api/inbound/org/:id",
  //   requirePriorityLevel1_Permission,
  //   async (req, res) => {
  //     await organizationModel.remove({ _id: req.params.id });
  //     const inbound_org = await organizationModel.find({});

  //     res.send(inbound_org);
  //   }
  // );
};
