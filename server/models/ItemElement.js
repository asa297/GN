const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemElement = new Schema({
  item_code: String,
  item_name: String,
  stock_type: Number,
  stock_typeName: String,
  item_qty: Number,
  remarks: String,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: { type: String, ref: "users" },
  LastModifyDate: Date
});

mongoose.model("ItemElements", ItemElement);
