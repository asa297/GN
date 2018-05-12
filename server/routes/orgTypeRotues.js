const mongoose = require("mongoose");
const OrgTypeModel = mongoose.model("orgtypes");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get("/api/orgType", requireLogin, async (req, res) => {
    const org_types = await OrgTypeModel.find({});
    res.send(org_types);
  });
};
