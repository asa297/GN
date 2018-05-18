const mongoose = require("mongoose");
const SellerModel = mongoose.model("sellers");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/inbound/seller", requireLogin, async (req, res) => {
    const group = await SellerModel({
      sellerName: req.body.seller_name,
      sellerCode: req.body.seller_code,
      sellerCom: req.body.seller_com,
      sellerRemarks: req.body.seller_remarks ? req.body.seller_remarks : "",
      RecordIdBy: req.user._ide,
      RecordNameBy: req.user.firstName,
      RecordDate: Date.now()
    }).save();
    res.send({});
  });

  app.get("/api/inbound/seller", requireLogin, async (req, res) => {
    const inbound_seller = await SellerModel.find({});
    res.send(inbound_seller);
  });

  app.post("/api/inbound/seller/edit/:id", async (req, res) => {
    await SellerModel.updateOne(
      {
        _id: req.params.id
      },
      {
        $set: {
          sellerName: req.body.seller_name,
          sellerCode: req.body.seller_code,
          sellerCom: req.body.seller_com,
          sellerRemarks: req.body.seller_remarks ? req.body.group_remark : "",
          RecordIdBy: req.user._ide,
          RecordNameBy: req.user.firstName,
          RecordDate: Date.now()
        }
      }
    ).exec();
    res.send({});
  });

  app.delete("/api/inbound/seller/:id", async (req, res) => {
    await SellerModel.remove({ _id: req.params.id });
    const inbound_seller = await SellerModel.find({});
    res.send(inbound_seller);
  });
};