const mongoose = require("mongoose");
const BranchSchema = require("./Branch");
const { Schema } = mongoose;

const ItemElement = new Schema({
  item_id: { type: Schema.Types.ObjectId, ref: "items" },
  item_code: String,
  item_name: String,
  stock_type: Number,
  stock_typeName: String,
  item_qty: Number,
  remarks: String,
  branch: BranchSchema,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: String,
  LastModifyDate: Date
});

mongoose.model("ItemElements", ItemElement);
