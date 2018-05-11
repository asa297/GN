const mongoose = require("mongoose");
const GroupModel = mongoose.model("groups");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/inbound/group", requireLogin, async (req, res) => {
    const group = await GroupModel({
      orgId: req.body.org_show.org_Id,
      orgName: req.body.org_show.org_Name,
      orgTypeId: req.body.org_show.org_TypeId,
      orgTypeName: req.body.org_show.org_TypeName,
      orgCode: req.body.org_code,
      groupName: req.body.group_name,
      groupCode: req.body.group_code,
      guideName: req.body.guide_name,
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now()
    }).save();

    res.send({});
  });

  app.get("/api/inbound/group", requireLogin, async (req, res) => {
    const inbound_group = await GroupModel.find({});

    res.send(inbound_group);
  });
};
