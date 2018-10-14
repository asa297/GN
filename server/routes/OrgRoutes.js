const mongoose = require("mongoose");
const organizationModel = mongoose.model("organizations");
const requireLogin = require("../middlewares/requireLogin");
// const requireOrgPriority = require("../middlewares/requireOrgPriority");

module.exports = app => {
  app.post("/api/org", requireLogin, async (req, res) => {

    const { priority } = req.user;

    switch (priority) {
      case 1:
      case 2:
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
        break;
      default:
        res.status(401).send();
        break;
    }

  });

  app.get("/api/org", requireLogin, async (req, res) => {
    const { priority } = req.user;

    switch (priority) {
      case 1:
      case 2:
        const org_form = await organizationModel.find({});
        res.send(org_form);

        // org_form = await organizationModel.find({}, { orgName: 1, orgCode: 1 });
        break;
      default:
        res.status(401).send();
        break;
    }


  });

  app.post("/api/org/edit/:id", requireLogin, async (req, res) => {
    const { priority } = req.user;

    switch (priority) {
      case 1:
      case 2:
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
        res.send();
        break;
      default:
        res.status(401).send();
        break;
    }

  });

  app.delete("/api/org/:id", requireLogin, async (req, res) => {
    // await organizationModel.remove({ _id: req.params.id });
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:   
        await organizationModel.findByIdAndRemove(req.params.id);
        res.send();
        break;
      default:
        res.status(401).send();
        break;
    }

  });
};
