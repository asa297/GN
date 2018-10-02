const mongoose = require("mongoose");
const organizationModel = mongoose.model("organizations");
const requireLogin = require("../middlewares/requireLogin");
// const requireOrgPriority = require("../middlewares/requireOrgPriority");

module.exports = app => {
  app.post("/api/org", requireLogin, async (req, res) => {
    const found = await organizationModel.findOne({
      orgCode: req.body.org_code
    });
    if (!found) {
      await organizationModel({
        orgTypeId: req.body.org_type.org_typeId,
        orgTypeName: req.body.org_type.org_typeName,
        orgName: req.body.org_name,
        orgComA: req.body.org_comA,
        orgComB: req.body.org_comB,
        orgCode: req.body.org_code,
        RecordIdBy: req.user._id,
        RecordNameBy: req.user.firstName,
        RecordDate: Date.now(),
        LastModifyById: req.user._id,
        LastModifyByName: req.user.firstName,
        LastModifyDate: Date.now()
      }).save();
      res.send();
    } else {
      res.status(403).send();
    }
  });

  app.get("/api/org", requireLogin, async (req, res) => {
    const { priority } = req.user;

    let org_form;
    switch (priority) {
      case 1:
        org_form = await organizationModel.find({});

        break;
      case 2:
        org_form = await organizationModel.find({}, { orgName: 1, orgCode: 1 });
        break;
      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        org_form = `Your Permeission is not valid : The System will record your ip address (${ip})`;
        break;
    }

    res.send(org_form);
  });

  app.post("/api/org/edit/:id", requireLogin, async (req, res) => {
    await organizationModel
      .updateOne(
        {
          _id: req.params.id
        },
        {
          $set: {
            orgTypeId: req.body.org_type.org_typeId,
            orgTypeName: req.body.org_type.org_typeName,
            orgName: req.body.org_name,
            orgCom: req.body.org_com,
            // orgCode: req.body.org_code,
            // RecordIdBy: req.user._id,
            // RecordNameBy: req.user.firstName,
            // RecordDate: Date.now(),
            LastModifyById: req.user._id,
            LastModifyByName: req.user.firstName,
            LastModifyDate: Date.now()
          }
        }
      )
      .exec();

    res.send({});
  });

  app.delete("/api/org/:id", requireLogin, async (req, res) => {
    // await organizationModel.remove({ _id: req.params.id });
    await organizationModel.findByIdAndRemove(req.params.id);

    res.send();
  });
};
