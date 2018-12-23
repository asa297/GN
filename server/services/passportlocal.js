const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const crypto = require("crypto");
const key = require("../config/key.js");

const User = mongoose.model("users");

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(null, user);
  });
});

passport.use(
  new Strategy(async function(username, password, cb) {
    let existingUser = await User.findOne({ UserName: username });

    if (existingUser) {
      const { Password } = existingUser;
      const passwordHash = crypto
        .createHmac("sha256", key.keySHA)
        .update(password)
        .digest("hex");

      if (Password != passwordHash) {
        return cb(null, null);
      }
      existingUser.Password = undefined;
      return cb(null, existingUser);
    }
    return cb(null, null);
  })
);
