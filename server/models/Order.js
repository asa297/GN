const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const { Schema } = mongoose;
const itemListSchema = require("./Item");
const groupSchema = require("./Group");
const sellerSchema = require("./Seller");
const orgSchema = require("./Org");

// const new_itemListSchema = new Schema(itemListSchema);

new Schema(itemListSchema).virtual("countQty");

const OrderSchema = new Schema({
  orderId: Number,
  group: groupSchema,
  // groupId: { type: Schema.Types.ObjectId, ref: "groups" },
  // groupCode: String,
  // groupStickerNumber: { type: String, default: "" },
  // groupRemarks: String,
  // guideName: String,
  // orgId: { type: Schema.Types.ObjectId, ref: "organizations" },
  // orgName: String,
  // orgTypeId: Number,
  // orgTypeName: String,
  // orgCode: String,
  // orgCom: Number,
  org: orgSchema,
  seller: sellerSchema,

  // sellerId: { type: Schema.Types.ObjectId, ref: "sellers" },
  // sellerName: String,
  // sellerCode: String,
  // sellerCom: Number,
  // sellerRemarks: String,
  itemList: [itemListSchema],
  total: SchemaTypes.Double,
  discount: { type: Number, default: 0 },
  credit: SchemaTypes.Double,
  creditcharge: SchemaTypes.Double,
  cash: SchemaTypes.Double,
  receivecash: SchemaTypes.Double,
  changecash: SchemaTypes.Double,
  grandtotal: SchemaTypes.Double,
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: String,
  LastModifyDate: Date
});

mongoose.model("orders", OrderSchema);
