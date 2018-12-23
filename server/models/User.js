const mongoose = require("mongoose");
const { Schema } = mongoose;

// const userSchema = new Schema({
//   googleID: String,
//   email: String,
//   firstName: String,
//   lastName: String,
//   priority: { type: Number, default: 0 }
// });

const userSchema = new Schema({
  UserName: String,
  Password: String,
  FirstName: String,
  priority: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
