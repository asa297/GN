const mongoose = require("mongoose");
const _ = require("lodash");
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

        //อย่าเพิง่ตัดสต็อกกุขี้เกียจไปเพิ่มทีหลัง
        // _.map(ItemList, async ({ _id, qty }) => {
        //   await itemModel
        //     .updateOne({ _id }, { $inc: { item_qty_PTY: qty * -1 } })
        //     .exec();
        // });

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
        const deliverynote = await DeliveryNotesModel.find({});
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
          } = await DeliveryNotesModel.findByIdAndUpdate(req.params.id, {
            DN_Status: 2,
            DN_StatusName: "Approve"
          });

          if (DN_Status === 1 || DN_Status === 4) {
            _.map(ItemList, async ({ _id, qty }) => {
              if (branch_destination.branch_Id === 1) {
                await itemModel
                  .updateOne({ _id }, { $inc: { item_qty: qty } })
                  .exec();
              } else if (branch_destination.branch_Id === 2) {
                await itemModel
                  .updateOne({ _id }, { $inc: { item_qty_PTY: qty } })
                  .exec();
              }
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
          } = await DeliveryNotesModel.findByIdAndUpdate(req.params.id, {
            DN_Status: 3,
            DN_StatusName: "Reject"
          });

          if (DN_Status === 1 || DN_Status === 4) {
            _.map(ItemList, async ({ _id, qty }) => {
              if (branch_origin.branch_Id === 1) {
                await itemModel
                  .updateOne({ _id }, { $inc: { item_qty: qty } })
                  .exec();
              } else if (branch_origin.branch_Id === 2) {
                await itemModel
                  .updateOne({ _id }, { $inc: { item_qty_PTY: qty } })
                  .exec();
              }
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
    "/api/deliverynote/action/save/:id",
    requireLogin,
    async (req, res) => {
      const { priority } = req.user;

      switch (priority) {
        case 1:
        case 2:
          const { DN_Status } = await DeliveryNotesModel.findById(
            req.params.id
          );

          if (DN_Status === 1 || DN_Status === 4) {
            const {
              branch_origin,
              branch_destination,
              ItemList,
              DN_Remark
            } = req.body;

            await DeliveryNotesModel.updateOne(
              {
                _id: req.params.id
              },
              {
                $set: {
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
                  DN_Status: 4,
                  DN_StatusName: "Edited",
                  ItemList,
                  DN_Remark,
                  LastModifyById: req.user._id,
                  LastModifyByName: req.user.firstName,
                  LastModifyDate: Date.now()
                }
              }
            ).exec();
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
};
