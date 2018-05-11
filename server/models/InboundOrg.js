const mongoose = require("mongoose");
const { Schema } = mongoose;

const inboundOrgSchema = new Schema({
  orgTypeId: Number,
  orgTypeName: String,
  orgName: String,
  orgCom: Number,
  orgCode: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date
});

mongoose.model("organization", inboundOrgSchema);
