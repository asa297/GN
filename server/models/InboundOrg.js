const mongoose = require("mongoose");
const { Schema } = mongoose;

const inboundOrgSchema = new Schema({
  orgTypeId: Number,
  orgTypeName: String,
  orgName: String,
  orgCom: Number,
  orgCode: String
});

mongoose.model("organization", inboundOrgSchema);
