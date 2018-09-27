const mongoose = require("mongoose");
const _ = require("lodash");
const moment = require("moment");
const DeliveryNotesModel = mongoose.model("DeliveryNotes");
const itemModel = mongoose.model("items");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/deliverynote", requireLogin, async (req, res) => {
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        const {
          branch_origin,
          branch_destination,
          ItemList,
          DN_Remark
        } = req.body;

        const DN_Id = `DN${Date.now()}`;

        await DeliveryNotesModel({
          DN_Id,
          branch_origin: {
            _id: branch_origin._id,
            branch_Id: branch_origin.branch_Id,
            branch_Name: branch_origin.branch_Name
          },
          branch_destination: {
            _id: branch_destination._id,
            branch_Id: branch_destination.branch_Id,
            branch_Name: branch_destination.branch_Name
          },
          DN_Status: 1,
          DN_StatusName: "New",
          ItemList,
          DN_Remark,
          RecordIdBy: req.user._id,
          RecordNameBy: req.user.firstName,
          RecordDate: Date.now(),
          LastModifyById: req.user._id,
          LastModifyByName: req.user.firstName,
          LastModifyDate: Date.now()
        }).save();

        _.map(ItemList, async ({ _id, item_code, item_name, qty }) => {
          await itemModel
            .updateOne({ _id }, { $inc: { item_qty_PTY: qty * -1 } })
            .exec();

          await new itemElementsModel({
            item_id: _id,
            item_code,
            item_name,
            stock_type: 2,
            stock_typeName: "Outbound",
            item_qty: qty,
            remarks: `The items are reserved by deliverynote #${DN_Id}`,
            branch: {
              _id: branch_origin._id,
              branch_Id: branch_origin.branch_Id,
              branch_Name: branch_origin.branch_Name
            },
            RecordIdBy: req.user._id,
            RecordNameBy: req.user.firstName,
            RecordDate: Date.now()
          }).save();
        });

        res.status(200).send({ DN_Id });
        break;
      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        const error = `Your Permeission is not valid : The System will record your ip address (${ip})`;
        res.status(401).send({ error });
        break;
    }
  });

  app.get("/api/deliverynote", requireLogin, async (req, res) => {
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        const deliverynote = await DeliveryNotesModel.find({
          RecordDate: {
            $gte: new Date(
              moment()
                .add(-7, "days")
                .format("YYYY-MM-DD HH:mm:ss")
            )
          }
        });

        res.status(200).send(deliverynote);
        break;
      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        const error = `Your Permeission is not valid : The System will record your ip address (${ip})`;
        res.status(401).send({ error });
        break;
    }
  });

  app.put(
    "/api/deliverynote/action/approve/:id",
    requireLogin,
    async (req, res) => {
      const { priority } = req.user;

      switch (priority) {
        case 1:
        case 2:
          const {
            ItemList,
            branch_destination,
            DN_Status
          } = await DeliveryNotesModel.findById(req.params.id);

          if (DN_Status === 1) {
            await DeliveryNotesModel.updateOne(
              {
                _id: req.params.id
              },
              {
                $set: {
                  DN_Status: 2,
                  DN_StatusName: "Approve",
                  LastModifyByName: req.user.firstName,
                  LastModifyDate: Date.now()
                }
              }
            ).exec();

            _.map(ItemList, async ({ _id, qty }) => {
              if (branch_destination.branch_Id === 1) {
                await itemModel
                  .updateOne(
                    { _id },
                    {
                      $inc: { item_qty: qty }
                    }
                  )
                  .exec();
              } else if (branch_destination.branch_Id === 2) {
                await itemModel
                  .updateOne(
                    { _id },
                    {
                      $inc: { item_qty_PTY: qty }
                    }
                  )
                  .exec();
              }

              await new itemElementsModel({
                item_id: _id,
                item_code,
                item_name,
                stock_type: 1,
                stock_typeName: "Inbound",
                item_qty: qty,
                remarks: `The approved items are transferred into inventory by deliverynote #${DN_Id}`,
                branch: {
                  _id: branch_destination._id,
                  branch_Id: branch_destination.branch_Id,
                  branch_Name: branch_destination.branch_Name
                },
                RecordIdBy: req.user._id,
                RecordNameBy: req.user.firstName,
                RecordDate: Date.now()
              }).save();
            });

            res.status(200).send();
          } else {
            res.status(403).send();
          }

          break;
        default:
          const ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket
              ? req.connection.socket.remoteAddress
              : null);
          const error = `Your Permeission is not valid : The System will record your ip address (${ip})`;
          res.status(401).send({ error });
          break;
      }
    }
  );

  app.put(
    "/api/deliverynote/action/reject/:id",
    requireLogin,
    async (req, res) => {
      const { priority } = req.user;

      switch (priority) {
        case 1:
        case 2:
          const {
            ItemList,
            branch_origin,
            DN_Status
          } = await DeliveryNotesModel.findById(req.params.id);

          if (DN_Status === 1) {
            await DeliveryNotesModel.updateOne(
              {
                _id: req.params.id
              },
              {
                $set: {
                  DN_Status: 3,
                  DN_StatusName: "Reject",
                  LastModifyByName: req.user.firstName,
                  LastModifyDate: Date.now()
                }
              }
            ).exec();

            _.map(ItemList, async ({ _id, qty }) => {
              if (branch_origin.branch_Id === 1) {
                await itemModel
                  .updateOne(
                    { _id },
                    {
                      $inc: { item_qty: qty }
                    }
                  )
                  .exec();
              } else if (branch_origin.branch_Id === 2) {
                await itemModel
                  .updateOne(
                    { _id },
                    {
                      $inc: { item_qty_PTY: qty }
                    }
                  )
                  .exec();
              }

              await new itemElementsModel({
                item_id: _id,
                item_code,
                item_name,
                stock_type: 1,
                stock_typeName: "Inbound",
                item_qty: qty,
                remarks: `The rejected items are transferred into inventory by deliverynote #${DN_Id}`,
                branch: {
                  _id: branch_origin._id,
                  branch_Id: branch_origin.branch_Id,
                  branch_Name: branch_origin.branch_Name
                },
                RecordIdBy: req.user._id,
                RecordNameBy: req.user.firstName,
                RecordDate: Date.now()
              }).save();
            });

            res.status(200).send();
          } else {
            res.status(403).send();
          }

          break;
        default:
          const ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket
              ? req.connection.socket.remoteAddress
              : null);
          const error = `Your Permeission is not valid : The System will record your ip address (${ip})`;
          res.status(401).send({ error });
          break;
      }
    }
  );

  app.get("/api/deliverynote/:DN_Id", requireLogin, async (req, res) => {
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        const deliverynote = await DeliveryNotesModel.findOne({
          DN_Id: req.params.DN_Id
        });

        res.status(200).send(deliverynote ? [deliverynote] : null);
        break;
      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        const error = `Your Permeission is not valid : The System will record your ip address (${ip})`;
        res.status(401).send({ error });
        break;
    }
  });
};
