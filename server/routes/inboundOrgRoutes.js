const mongoose = require("mongoose");
const organizationModel = mongoose.model("organizations");
const requireLogin = require("../middlewares/requireLogin");
const requirePriorityLevel1_Permission = require("../middlewares/requirePriorityLevel1_Permission");

module.exports = app => {
  app.post(
    "/api/inbound/org",
    requirePriorityLevel1_Permission,
    async (req, res) => {
      const org = await organizationModel({
        orgTypeId: req.body.org_type.org_typeId,
        orgTypeName: req.body.org_type.org_typeName,
        orgName: req.body.org_name,
        orgCom: req.body.org_com,
        orgCode: req.body.org_code,
        RecordIdBy: req.user._id,
        RecordNameBy: req.user.firstName,
        RecordDate: Date.now()
      }).save();
      res.send({});
    }
  );

  app.get(
    "/api/inbound/org",
    requirePriorityLevel1_Permission,
    async (req, res) => {
      const inbound_org = await organizationModel.find({});

      res.send(inbound_org);
    }
  );

  app.post(
    "/api/inbound/org/edit/:id",
    requirePriorityLevel1_Permission,
    async (req, res) => {
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
              orgCode: req.body.org_code,
              RecordIdBy: req.user._id,
              RecordNameBy: req.user.firstName,
              RecordDate: Date.now()
            }
          }
        )
        .exec();

      res.send({});
    }
  );

  app.delete(
    "/api/inbound/org/:id",
    requirePriorityLevel1_Permission,
    async (req, res) => {
      await organizationModel.remove({ _id: req.params.id });
      const inbound_org = await organizationModel.find({});

      res.send(inbound_org);
    }
  );
};
