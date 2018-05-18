const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/key");

require("./models/User");
require("./models/OrgType");
require("./models/InboundOrg");
require("./models/InboundGroup");
require("./models/InboundSeller");
require("./models/inboundItem");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/orgTypeRotues")(app);
require("./routes/inboundOrgRoutes")(app);
require("./routes/inboundGroupRoutes")(app);
require("./routes/inboundSellerRoutes")(app);
require("./routes/inboundItemRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
