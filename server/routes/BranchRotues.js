const mongoose = require("mongoose");
const BranchModel = mongoose.model("branches");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get("/api/branch", requireLogin, async (req, res) => {
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        const branches = await BranchModel.find({});
        res.status(200).send(branches);
        break;
      default:
        const ip =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        const error = `Your Permeission is not valid : The System will record your ip address (${ip})`;
        res.status(401).send({ error });
        break;
    }
  });
};
