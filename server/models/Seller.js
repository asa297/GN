const mongoose = require("mongoose");
const { Schema } = mongoose;

const SellerSchema = new Schema({
  sellerName: String,
  sellerCode: String,
  sellerCom: { type: Number, default: 0 },
  sellerRemarks: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: { type: String, ref: "users" },
  LastModifyDate: Date
});

mongoose.model("sellers", SellerSchema);
