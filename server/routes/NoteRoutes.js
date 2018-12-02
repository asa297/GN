const mongoose = require("mongoose");
const NotesModel = mongoose.model("notes");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/note", requireLogin, async (req, res) => {
    // 1 , 2
    const { priority } = req.user;
    const { noteTitle, noteMessage } = req.body;
    switch (priority) {
      case 1:
      case 2:
        await NotesModel({
          noteTitle,
          noteMessage,
          RecordIdBy: req.user._id,
          RecordNameBy: req.user.firstName,
          RecordDate: Date.now(),
          LastModifyById: req.user._id,
          LastModifyByName: req.user.firstName,
          LastModifyDate: Date.now()
        }).save();
        res.send();
        break;
      default:
        res.status(401).send();
        break;
    }
  });

  app.get("/api/note", requireLogin, async (req, res) => {
    const notes = await NotesModel.find()
      .sort({ LastModifyDate: -1 })
      .limit(10);

    res.send(notes);
  });

  app.delete("/api/note/:id", requireLogin, async (req, res) => {
    // 1 , 2
    const { priority } = req.user;
    switch (priority) {
      case 1:
      case 2:
        await NotesModel.findByIdAndRemove(req.params.id);
        res.send();
        break;
      default:
        res.status(401).send();
        break;
    }
  });
};
