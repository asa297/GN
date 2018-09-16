const mongoose = require("mongoose");
const { Schema } = mongoose;

const BranchSchema = new Schema({
  branch_Id: Number,
  branch_Name: String
});

mongoose.model("branches", BranchSchema);
