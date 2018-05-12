const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrgTypeSchema = new Schema({
  org_typeId: Number,
  org_typeName: String
});

mongoose.model("orgtypes", OrgTypeSchema);
