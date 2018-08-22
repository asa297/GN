const mongoose = require("mongoose");
const moment = require("moment");
const GroupModel = mongoose.model("groups");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/group", requireLogin, async (req, res) => {
    const group = await GroupModel({
      orgId: req.body.org_option._id,
      orgName: req.body.org_option.orgName,
      orgCode: req.body.org_option.orgCode,
      orgCom: req.body.org_option.orgCom,
      orgTypeId: req.body.org_option.orgTypeId,
      orgTypeName: req.body.org_option.orgTypeName,
      groupRemarks: req.body.group_remark ? req.body.group_remark : "",
      groupCode: req.body.group_code,
      groupStickerNumber: req.body.group_stickernumber,
      guideName: req.body.guide_name,
      RecordIdBy: req.user._id,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now(),
      LastModifyById: req.user._id,
      LastModifyByName: req.user.firstName,
      LastModifyDate: Date.now()
    }).save();

    res.send({});
  });

  app.post("/api/group/edit/:id", requireLogin, async (req, res) => {
    await GroupModel.updateOne(
      {
        _id: req.params.id
      },
      {
        $set: {
          orgId: req.body.org_option._id,
          orgName: req.body.org_option.orgName,
          orgCode: req.body.org_option.orgCode,
          orgCom: req.body.org_option.orgCom,
          orgTypeId: req.body.org_option.orgTypeId,
          orgTypeName: req.body.org_option.orgTypeName,
          groupRemarks: req.body.group_remark ? req.body.group_remark : "",
          groupCode: req.body.group_code,
          groupStickerNumber: req.body.group_stickernumber,
          guideName: req.body.guide_name,
          // RecordIdBy: req.user._id,
          // RecordNameBy: req.user.firstName,
          // RecordDate: Date.now(),
          LastModifyById: req.user._id,
          LastModifyByName: req.user.firstName,
          LastModifyDate: Date.now()
        }
      }
    ).exec();

    res.send({});
  });

  app.get("/api/group", requireLogin, async (req, res) => {
    const group_form = await GroupModel.find({});
    res.send(group_form);
  });

  app.get("/api/group/filter", requireLogin, async (req, res) => {
    const group_form = await GroupModel.find({
      RecordDate: {
        $gte: new Date(
          moment()
            .add(-7, "days")
            .format("YYYY-MM-DD HH:mm:ss")
        )
      }
    });
    res.send(group_form);
  });

  app.delete("/api/group/:id", requireLogin, async (req, res) => {
    await GroupModel.remove({ _id: req.params.id });
    const group_form = await GroupModel.find({});

    res.send(group_form);
  });
};
