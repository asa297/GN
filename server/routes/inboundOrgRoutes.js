const mongoose = require("mongoose");
const organizationModel = mongoose.model("organization");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/inbound/org", requireLogin, async (req, res) => {
    const org = await organizationModel({
      orgTypeId: req.body.org_type.org_typeId,
      orgTypeName: req.body.org_type.org_typeName,
      orgName: req.body.org_name,
      orgCom: req.body.org_com,
      orgCode: req.body.org_code,
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName
    }).save();
    res.send({});
  });

  app.get("/api/inbound/org", requireLogin, async (req, res) => {
    const inbound_org = await organizationModel.find({});

    res.send(inbound_org);
  });
};
