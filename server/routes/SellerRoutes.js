const mongoose = require("mongoose");
const SellerModel = mongoose.model("sellers");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/seller", requireLogin, async (req, res) => {
    // 1

    const found = await SellerModel.findOne({
      sellerCode: req.body.seller_code
    });

    if (!found) {
      const group = await SellerModel({
        sellerName: req.body.seller_name,
        sellerCode: req.body.seller_code,
        sellerCom: req.body.seller_com,
        sellerRemarks: req.body.seller_remarks ? req.body.seller_remarks : "",
        RecordIdBy: req.user._ide,
        RecordNameBy: req.user.firstName,
        RecordDate: Date.now(),
        LastModifyById: req.user._id,
        LastModifyByName: req.user.firstName,
        LastModifyDate: Date.now()
      }).save();
      res.send({});
    } else {
      res.status(403).send();
    }
  });

  app.get("/api/seller", requireLogin, async (req, res) => {
    const { priority } = req.user;

    let seller;

    switch (priority) {
      case 1:
        seller = await SellerModel.find({});
        break;
      case 2:
        seller = await SellerModel.find(
          {},
          {
            sellerCode: 1,
            sellerName: 1,
            sellerCom: 1,
            sellerRemarks: 1,
            LastModifyByName: 1,
            LastModifyDate: 1
          }
        );
        break;
      case 3:
        seller = await SellerModel.find(
          {},
          {
            sellerCode: 1,
            sellerName: 1,
            sellerRemarks: 1,
            LastModifyByName: 1,
            LastModifyDate: 1
          }
        );
        break;
      default:
        break;
    }
    res.send(seller);
  });

  app.post("/api/seller/edit/:id", requireLogin, async (req, res) => {
    // 1

    await SellerModel.updateOne(
      {
        _id: req.params.id
      },
      {
        $set: {
          sellerName: req.body.seller_name,
          // sellerCode: req.body.seller_code,
          sellerCom: req.body.seller_com,
          sellerRemarks: req.body.seller_remarks ? req.body.group_remark : "",
          LastModifyById: req.user._id,
          LastModifyByName: req.user.firstName,
          LastModifyDate: Date.now()
        }
      }
    ).exec();
    res.send({});
  });

  app.delete("/api/seller/:id", async (req, res) => {
    //1
    await SellerModel.findByIdAndRemove(req.params.id);

    res.send();
  });
};
