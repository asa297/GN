const mongoose = require("mongoose");
const BranchSchema = require("./Branch");
const { Schema } = mongoose;

const DeliveryNoteSchema = new Schema({
  DN_Id: String,
  branch_origin: BranchSchema,
  branch_destination: BranchSchema,
  DN_Status: Number,
  DN_StatusName: String,
  ItemList: [],
  DN_Remark: { type: String, default: "" },
  RecordIdBy: { type: Schema.Types.ObjectId, ref: "users" },
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: { type: Schema.Types.ObjectId, ref: "users" },
  LastModifyByName: String,
  LastModifyDate: Date
});

mongoose.model("DeliveryNotes", DeliveryNoteSchema);
