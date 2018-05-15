const mongoose = require("mongoose");
const { Schema } = mongoose;

const inboundSellerSchema = new Schema({
  sellerName: String,
  sellerCode: String,
  sellerCom: Number,
  sellerRemarks: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date
});

mongoose.model("sellers", inboundSellerSchema);
