const mongoose = require("mongoose");
const { Schema } = mongoose;

const orgChinaListSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "organizations" },
  orgTypeId: Number,
  orgTypeName: String,
  orgName: String,
  orgCode: String,
  orgCom_B: Number
});

module.exports = orgChinaListSchema;
