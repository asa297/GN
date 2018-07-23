const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrgSchema = new Schema({
  orgTypeId: Number,
  orgTypeName: String,
  orgName: String,
  orgCom: Number,
  orgCode: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: { type: String, ref: "users" },
  LastModifyDate: Date
});

mongoose.model("organizations", OrgSchema);