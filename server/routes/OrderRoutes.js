const mongoose = require("mongoose");
const _ = require("lodash");
const moment = require("moment");
const orderModel = mongoose.model("orders");
const itemModel = mongoose.model("items");
const groupModel = mongoose.model("groups");
const sellerModel = mongoose.model("sellers");
const CreateDailyCashBalanceReport = require("../middlewares/CreateDailyCashBalanceReport");
const CreateDailyComGroupReport = require("../middlewares/CreateDailyComGroupReport");

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

    const group_select_query = groupModel.findOne({ _id: group_select._id });
    const seller_select_query = seller_select
      ? sellerModel.findOne({ _id: seller_select._id })
      : null;

    const result = await Promise.all([group_select_query, seller_select_query])
      .then(result => {
        return {
          group_select: result[0],
          seller_select: result[1]
        };
      })
      .catch(function(err) {
        return err;
      });

    const order = await orderModel({
      orderId,
      //
      group: {
        groupId: result["group_select"]._id,
        groupCode: result["group_select"].groupCode,
        groupStickerNumber: result["group_select"].groupStickerNumber,
        groupRemarks: result["group_select"].groupRemarks,
        guideName: result["group_select"].guideName
      },
      org: {
        orgId: result["group_select"].orgId,
        orgName: result["group_select"].orgName,
        orgTypeId: result["group_select"].orgTypeId,
        orgTypeName: result["group_select"].orgTypeName,
        orgCode: result["group_select"].orgCode,
        orgCom: result["group_select"].orgCom
      },
      //
      seller: {
        sellerId: seller_select ? result["seller_select"]._id : null,
        sellerName: seller_select ? result["seller_select"].sellerName : "",
        sellerCode: seller_select ? result["seller_select"].sellerCode : "",
        sellerCom: seller_select ? result["seller_select"].sellerCom : 0,
        sellerRemarks: seller_select
          ? result["seller_select"].sellerRemarks
          : ""
      },
      //
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
    const { group_select, orgCom, seller_select, sellerCom } = req.body;

    await orderModel
      .updateOne(
        {
          orderId: req.params.id
        },
        {
          $set: {
            group: {
              groupId: group_select._id,
              groupCode: group_select.groupCode,
              groupStickerNumber: group_select.groupStickerNumber,
              groupRemarks: group_select.groupRemarks,
              guideName: group_select.guideName
            },
            org: {
              orgId: group_select.orgId,
              orgName: group_select.orgName,
              orgTypeId: group_select.orgTypeId,
              orgTypeName: group_select.orgTypeName,
              orgCode: group_select.orgCode,
              orgCom
            },
            seller: {
              sellerId: seller_select ? seller_select._id : null,
              sellerName: seller_select ? seller_select.sellerName : "",
              sellerCode: seller_select ? seller_select.sellerCode : "",
              sellerCom: seller_select ? seller_select.sellerCom : 0,
              sellerRemarks: seller_select ? seller_select.sellerRemarks : ""
            },

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

  app.post("/api/order/daily/cashbalance/filter", async (req, res) => {
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

    const result = await CreateDailyCashBalanceReport(order);

    res.send(result);
  });

  app.post("/api/order/daily/com/filter", async (req, res) => {
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

    const result = CreateDailyComGroupReport(order, select_date);

    res.send(result);
  });
};
