const mongoose = require("mongoose");
const _ = require("lodash");
const moment = require("moment");
const orderModel = mongoose.model("orders");
const itemModel = mongoose.model("items");
const groupModel = mongoose.model("groups");
const sellerModel = mongoose.model("sellers");
const CreateDailyCashBalanceReport = require("../middlewares/CreateDailyCashBalanceReport");
const CreateDailyComGroupReport = require("../middlewares/CreateDailyComGroupReport");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // 1,2,3
  app.post("/api/order", requireLogin, async (req, res) => {
    const {
      group_select,
      seller_select,
      itemList,
      total,
      discountPercent,
      discount,
      credit,
      creditcharge,
      creditchargePercent,
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
        orgComA: result["group_select"].orgComA,
        orgComB: result["group_select"].orgComB
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
      discountPercent,
      discount,
      credit,
      creditcharge,
      creditchargePercent,
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
      _.map(itemList, async ({ _id, countQty }) => {
        await itemModel
          .updateOne({ _id }, { $inc: { item_qty_PTY: countQty * -1 } })
          .exec();
      });

      res.send(order);
    } else {
      res.status(400).send({ error: "Order is not success" });
    }
  });

  app.get("/api/order", requireLogin, async (req, res) => {
    // 1,2
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

  app.post("/api/order/filter", requireLogin, async (req, res) => {
    // 1,2
    const { start_date, end_date } = req.body;

    const order = await orderModel.find({
      RecordDate: {
        $gte: new Date(moment(start_date).format("YYYY-MM-DD HH:mm:ss")),
        $lt: new Date(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
      }
    });

    res.send(order);
  });

  app.post("/api/order/edit/:id", requireLogin, async (req, res) => {
    //1
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

  app.delete("/api/order/:id", requireLogin, async (req, res) => {
    //1
    await orderModel.findOneAndRemove({ orderId: req.params.id });

    res.send({});
  });

  app.get("/api/order/:orderId", requireLogin, async (req, res) => {
    //1,2
    const item = await orderModel.findOne({ orderId: req.params.orderId });

    res.send(item);
  });

  app.post(
    "/api/order/daily/cashbalance/filter",
    requireLogin,
    async (req, res) => {
      const { select_date } = req.body;

      const { priority } = req.user;

      let result;

      switch (priority) {
        case 1:
        case 2:
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
          result = await CreateDailyCashBalanceReport(order);
          break;
        default:
          const ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket
              ? req.connection.socket.remoteAddress
              : null);
          res.status(401).send({
            error: `Your Permeission is not valid : The System will record your ip address (${ip})`
          });
          break;
      }

      res.send(result);
    }
  );

  app.post("/api/order/daily/com/filter", requireLogin, async (req, res) => {
    const { select_date } = req.body;

    const { priority } = req.user;

    let result;
    switch (priority) {
      case 1:
      case 2:
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

        result = CreateDailyComGroupReport(order, select_date);

        break;

      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        res.status(401).send({
          error: `Your Permeission is not valid : The System will record your ip address (${ip})`
        });
        break;
    }

    res.send(result);
  });
};
