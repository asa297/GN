const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const key = require("../config/key.js");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.googleClientID,
      clientSecret: key.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        done(null, existingUser);
      }
      else {
        done(null, null);
      }
      // else {
      //   const user = await new User({
      //     googleID: profile.id,
      //     email: profile.emails[0].value,
      //     firstName: profile.name.givenName,
      //     lastName: profile.name.familyName
      //   }).save();
      //   done(null, user);
      // }
    }
  )
);
