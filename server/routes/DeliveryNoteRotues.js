const mongoose = require("mongoose");
const DeliveryNotesModel = mongoose.model("DeliveryNotes");
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
          doc_remarks
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
          DN_Remark: doc_remarks,
          RecordIdBy: req.user._id,
          RecordNameBy: req.user.firstName,
          RecordDate: Date.now(),
          LastModifyById: req.user._id,
          LastModifyByName: req.user.firstName,
          LastModifyDate: Date.now()
        }).save();

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

  app.put("/api/deliverynote/approve", requireLogin, async (req, res) => {
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        console.log(req.body);
        res.status(200).send();
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
