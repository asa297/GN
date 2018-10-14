const mongoose = require("mongoose");
const moment = require("moment");
const organizationModel = mongoose.model("organizations");
const GroupModel = mongoose.model("groups");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/group", requireLogin, async (req, res) => {
    // 1 , 2
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
      const found = await GroupModel.findOne({
        groupCode: req.body.group_code
      });
  
      if (!found) {
        const org_select_query = await organizationModel.findOne({
          _id: req.body.org_option._id
        });
        await GroupModel({
          orgId: org_select_query._id,
          orgName: org_select_query.orgName,
          orgCode: org_select_query.orgCode,
          orgComA: org_select_query.orgComA,
          orgComB: org_select_query.orgComB,
          orgTypeId: org_select_query.orgTypeId,
          orgTypeName: org_select_query.orgTypeName,
          groupRemarks: req.body.group_remark ? req.body.group_remark : "",
          groupCode: req.body.group_code,
          groupStickerNumber: req.body.group_stickernumber
            ? req.body.group_stickernumber
            : "",
          guideName: req.body.guide_name,
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

  app.post("/api/group/edit/:id", requireLogin, async (req, res) => {
    // 1 , 2

    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        const org_select_query = await organizationModel.findOne({
          _id: req.body.org_option._id
        });
    
        await GroupModel.updateOne(
          {
            _id: req.params.id
          },
          {
            $set: {
              orgId: org_select_query._id,
              orgName: org_select_query.orgName,
              orgCode: org_select_query.orgCode,
              orgComA: org_select_query.orgComA,
              orgComB: org_select_query.orgComB,
              orgTypeId: org_select_query.orgTypeId,
              orgTypeName: org_select_query.orgTypeName,
              groupRemarks: req.body.group_remark ? req.body.group_remark : "",
              // groupCode: req.body.group_code,
              groupStickerNumber: req.body.group_stickernumber
                ? req.body.group_stickernumber
                : "",
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
        break;
      default:
        res.status(401).send();
        break;
    }

  });

  app.get("/api/group", requireLogin, async (req, res) => {
    //1,2
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        const group_form = await GroupModel.find({});
        res.send(group_form);
        break;
      default:
        res.status(401).send();
        break;
    }


  });

  app.get("/api/group/filter", requireLogin, async (req, res) => {
    const { priority } = req.user;

    let group_form;

    switch (priority) {
      case 1:
      case 2:
        group_form = await GroupModel.find({
          RecordDate: {
            $gte: new Date(
              moment()
                .add(-7, "days")
                .format("YYYY-MM-DD HH:mm:ss")
            )
          }
        });
        res.send(group_form);
        break;
      case 3:
        group_form = await GroupModel.find(
          {
            RecordDate: {
              $gte: new Date(
                moment()
                  .add(-7, "days")
                  .format("YYYY-MM-DD HH:mm:ss")
              )
            }
          },
          {
            orgId: 1,
            groupCode: 1,
            groupStickerNumber: 1,
            groupRemarks: 1,
            guideName: 1,
            LastModifyByName: 1,
            LastModifyDate: 1
          }
        );
        res.send(group_form);
        break;

      default:
        res.status(401).send();
        break;
    }

  });

  app.delete("/api/group/:id", requireLogin, async (req, res) => {
    // 1 , 2

    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        await GroupModel.findByIdAndRemove(req.params.id);
        res.send();
        break;
      default:
        res.status(401).send();
        break;
    }

  });
};
