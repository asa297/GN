const _ = require("lodash");
const mongoose = require("mongoose");
const moment = require("moment");
const itemElementsModel = mongoose.model("ItemElements");
const requireLogin = require("../middlewares/requireLogin");
const CreateDailyInventoryReport = require("../middlewares/CreateDailyInventoryReport");
// const requirePriorityLevel1_Permission = require("../middlewares/requirePriorityLevel1_Permission");

module.exports = app => {
  app.post("/api/itemelement/inbound", requireLogin, async (req, res) => {
    const { priority } = req.user;
    const {
      _id,
      item_code,
      item_name,
      inbound_qty,
      // item_qty,
      item_qty_PTY,
      inbound_remarks
    } = req.body;

    switch (priority) {
      case 1:
      case 2:
        const itemelement = await new itemElementsModel({
          item_id: _id,
          item_code,
          item_name,
          stock_type: 1,
          stock_typeName: "Inbound",
          item_qty: inbound_qty,
          item_remain: item_qty_PTY,
          remarks: inbound_remarks ? inbound_remarks : "Deposit Inventory",
          RecordIdBy: req.user._id,
          RecordNameBy: req.user.firstName,
          RecordDate: Date.now()
        }).save();
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

    res.status(200).send({});
  });

  app.post("/api/itemelement/outbound", requireLogin, async (req, res) => {
    const { priority } = req.user;
    const {
      _id,
      item_code,
      item_name,
      outbound_qty,
      // item_qty,
      item_qty_PTY,
      outbound_remarks
    } = req.body;

    switch (priority) {
      case 1:
      case 2:
        const itemelement = await new itemElementsModel({
          item_id: _id,
          item_code,
          item_name,
          stock_type: 2,
          stock_typeName: "Outbound",
          item_qty: outbound_qty,
          item_remain: item_qty_PTY,
          remarks: outbound_remarks ? outbound_remarks : "Withdraw Invertory",
          RecordIdBy: req.user._id,
          RecordNameBy: req.user.firstName,
          RecordDate: Date.now()
        }).save();
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

    res.status(200).send({});
  });

  app.post("/api/itemelement/outbound/po", requireLogin, async (req, res) => {
    const { priority } = req.user;
    const { itemList } = req.body;

    switch (priority) {
      case 1:
      case 2:
      case 3:
        _.map(
          itemList,
          async ({ _id, item_code, item_name, countQty, item_qty_PTY }) => {
            await new itemElementsModel({
              item_id: _id,
              item_code,
              item_name,
              stock_type: 3,
              stock_typeName: "Outbound",
              item_qty: countQty,
              item_remain: item_qty_PTY - Number(countQty),
              remarks: "Purchase Order",
              RecordIdBy: req.user._id,
              RecordNameBy: req.user.firstName,
              RecordDate: Date.now()
            }).save();
          }
        );
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

    res.status(200).send({});
  });

  app.get("/api/itemelement/inbound", requireLogin, async (req, res) => {
    const { priority } = req.user;
    let itemelement;
    switch (priority) {
      case 1:
      case 2:
        itemelement = await itemElementsModel.find({
          stock_type: 1,
          RecordDate: {
            $gte: new Date(
              moment()
                .add(-7, "days")
                .format("YYYY-MM-DD HH:mm:ss")
            )
          }
        });
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

    res.send(itemelement);
  });

  app.get("/api/itemelement/outbound", requireLogin, async (req, res) => {
    const { priority } = req.user;
    let itemelement;
    switch (priority) {
      case 1:
      case 2:
        itemelement = await itemElementsModel.find({
          stock_type: [2, 3],
          RecordDate: {
            $gte: new Date(
              moment()
                .add(-7, "days")
                .format("YYYY-MM-DD HH:mm:ss")
            )
          }
        });
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

    res.send(itemelement);
  });

  app.post(
    "/api/itemelement/inbound/filter",
    requireLogin,
    async (req, res) => {
      const { priority } = req.user;
      const { start_date, end_date } = req.body;
      let itemelement;
      switch (priority) {
        case 1:
        case 2:
          itemelement = await itemElementsModel.find({
            stock_type: 1,
            RecordDate: {
              $gte: new Date(moment(start_date).format("YYYY-MM-DD HH:mm:ss")),
              $lt: new Date(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
            }
          });
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

      res.send(itemelement);
    }
  );

  app.post(
    "/api/itemelement/outbound/filter",
    requireLogin,
    async (req, res) => {
      const { priority } = req.user;
      const { start_date, end_date } = req.body;
      let itemelement;
      switch (priority) {
        case 1:
        case 2:
          itemelement = await itemElementsModel.find({
            stock_type: [2, 3],
            RecordDate: {
              $gte: new Date(moment(start_date).format("YYYY-MM-DD HH:mm:ss")),
              $lt: new Date(moment(end_date).format("YYYY-MM-DD HH:mm:ss"))
            }
          });
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

      res.send(itemelement);
    }
  );

  app.post("/api/itemelement/daily/filter", requireLogin, async (req, res) => {
    const { priority } = req.user;
    const { select_date } = req.body;

    let result;
    switch (priority) {
      case 1:
      case 2:
        const inbound = itemElementsModel.find({
          stock_type: 1,
          RecordDate: {
            $gte: new Date(moment(select_date).format("YYYY-MM-DD HH:mm:ss")),
            $lt: new Date(
              moment(select_date)
                .add(1, "days")
                .format("YYYY-MM-DD HH:mm:ss")
            )
          }
        });

        const outbound = itemElementsModel.find({
          stock_type: [2, 3],
          RecordDate: {
            $gte: new Date(moment(select_date).format("YYYY-MM-DD HH:mm:ss")),
            $lt: new Date(
              moment(select_date)
                .add(1, "days")
                .format("YYYY-MM-DD HH:mm:ss")
            )
          }
        });

        const promises = [inbound, outbound];

        result = await Promise.all(promises)
          .then(result => {
            const _result = {
              inbound: result[0],
              outbound: result[1]
            };
            return CreateDailyInventoryReport(_result);
          })
          .catch(function(err) {
            return err;
          });
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
