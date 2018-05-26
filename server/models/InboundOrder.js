const mongoose = require("mongoose");
const { Schema } = mongoose;
const itemListSchema = require("./inboundItem");

const new_itemListSchema = new Schema(itemListSchema);

new_itemListSchema.virtual("countQty");

const inboundOrderSchema = new Schema({
  groupId: { type: Schema.Types.ObjectId, ref: "groups" },
  groupCode: String,
  guideName: String,
  orgId: { type: Schema.Types.ObjectId, ref: "organizations" },
  orgName: String,
  orgTypeId: Number,
  orgTypeName: String,
  orgCode: String,
  orgCom: Number,
  sellerId: { type: Schema.Types.ObjectId, ref: "sellers" },
  sellerName: String,
  sellerCom: Number,
  itemList: [new_itemListSchema],
  total: Number,
  discount: Number,
  credit: Number,
  cash: Number,
  grandtotal: Number,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date
});

mongoose.model("orders", inboundOrderSchema);
