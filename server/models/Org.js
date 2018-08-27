const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrgSchema = new Schema({
  orgTypeId: Number,
  orgTypeName: String,
  orgName: String,
  orgComA: { type: Number, default: 0 },
  orgComB: { type: Number, default: 0 },
  orgCode: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: String,
  LastModifyDate: Date
});

mongoose.model("organizations", OrgSchema);
