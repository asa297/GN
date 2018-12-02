const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  noteTitle: String,
  noteMessage: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: String,
  LastModifyDate: Date
});

mongoose.model("notes", NotesSchema);
