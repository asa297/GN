const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const { Schema } = mongoose;
const itemListSchema = require("./inboundItem");

// const new_itemListSchema = new Schema(itemListSchema);

new Schema(itemListSchema).virtual("countQty");

const inboundOrderSchema = new Schema({
  orderId: Number,
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
  itemList: [itemListSchema],
  total: SchemaTypes.Double,
  discount: {type : Number , default : 0},
  credit: SchemaTypes.Double,
  cash: SchemaTypes.Double,
  receivecash: SchemaTypes.Double,
  changecash: SchemaTypes.Double,
  grandtotal: SchemaTypes.Double,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: { type: String, ref: "users" },
  RecordDate: Date
});

mongoose.model("orders", inboundOrderSchema);
