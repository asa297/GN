const mongoose = require("mongoose");
const { Schema } = mongoose;
// const orgChinaListSchema = require("./ItemB");

const itemSchema = new Schema({
  item_code: String,
  item_name: String,
  item_factory: String,
  item_color: String,
  item_skin: String,
  item_price: Number,
  item_qty: { type: Number, default: 0 },
  item_remarks: String,
  itemTypeId: Number,
  itemTypeName: String,
  // orgChinaList: [orgChinaListSchema],
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: { type: String, ref: "users" },
  LastModifyDate: Date
});

mongoose.model("items", itemSchema);
