const mongoose = require("mongoose");
const { Schema } = mongoose;

const SellerSchema = new Schema({
  sellerName: String,
  sellerCode: String,
  sellerCom: { type: Number, default: 0 },
  sellerRemarks: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: String,
  LastModifyDate: Date
});

mongoose.model("sellers", SellerSchema);
