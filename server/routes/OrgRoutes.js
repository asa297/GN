const mongoose = require("mongoose");
const organizationModel = mongoose.model("organizations");
const requireLogin = require("../middlewares/requireLogin");
const requirePriorityLevel1_Permission = require("../middlewares/requirePriorityLevel1_Permission");

module.exports = app => {
  app.post("/api/org", requirePriorityLevel1_Permission, async (req, res) => {
    const org = await organizationModel({
      orgTypeId: req.body.org_type.org_typeId,
      orgTypeName: req.body.org_type.org_typeName,
      orgName: req.body.org_name,
      orgCom: req.body.org_com,
      orgCode: req.body.org_code,
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now(),
      LastModifyById: req.user._id,
      LastModifyByName: req.user.firstName,
      LastModifyDate: Date.now()
    }).save();
    res.send({});
  });

  app.get("/api/org", requirePriorityLevel1_Permission, async (req, res) => {
    const org_form = await organizationModel.find({});

    res.send(org_form);
  });

  app.post(
    "/api/org/edit/:id",
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
    }
  );

  app.delete(
    "/api/org/:id",
    requirePriorityLevel1_Permission,
    async (req, res) => {
      await organizationModel.remove({ _id: req.params.id });
      const org_form = await organizationModel.find({});

      res.send(org_form);
    }
  );
};
