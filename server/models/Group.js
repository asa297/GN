const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: "organizations" },
  orgName: String,
  orgTypeId: Number,
  orgTypeName: String,
  orgCode: String,
  orgComA: { type: Number, default: 0 },
  orgComB: { type: Number, default: 0 },
  groupCode: String,
  groupStickerNumber: { type: String, default: "" },
  groupRemarks: String,
  guideName: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: String,
  LastModifyDate: Date
});

mongoose.model("groups", GroupSchema);
