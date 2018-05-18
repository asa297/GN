const mongoose = require("mongoose");
const { Schema } = mongoose;
const orgChinaListSchema = require("./InboundItemB");

const itemSchema = new Schema({
  item_code: String,
  item_name: String,
  item_price: Number,
  item_qty: { type: Number, default: 0 },
  itemTypeId: Number,
  itemTypeName: String,
  orgChinaList: [orgChinaListSchema],
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date
});

mongoose.model("items", itemSchema);