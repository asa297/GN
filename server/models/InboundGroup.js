const mongoose = require("mongoose");
const { Schema } = mongoose;

const inboundGroupSchema = new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: "organizations" },
  orgName: String,
  orgTypeId: Number,
  orgTypeName: String,
  orgCode: String,
  orgCom: Number,
  groupCode: String,
  groupRemarks: String,
  guideName: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date
});

mongoose.model("groups", inboundGroupSchema);
