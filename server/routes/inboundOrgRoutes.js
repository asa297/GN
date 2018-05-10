const mongoose = require("mongoose");
const organizationModel = mongoose.model("organization");

module.exports = app => {
  app.post("/api/inbound/org", async (req, res) => {
    const org = await organizationModel({
      orgTypeId: req.body.org_type.org_typeId,
      orgTypeName: req.body.org_type.org_typeName,
      orgName: req.body.org_name,
      orgCom: req.body.org_com,
      orgCode: req.body.org_code
    }).save();
    res.send({});
  });
};
