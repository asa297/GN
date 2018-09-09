const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/key");

require("./models/User");
require("./models/OrgType");
require("./models/Org");
require("./models/Group");
require("./models/Seller");
require("./models/Item");
require("./models/Order");
require("./models/ItemElement");
require("./services/passport");

mongoose.connect(keys.mongoURI);

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./socket")(io);
require("./routes/authRoutes")(app);
require("./routes/orgTypeRotues")(app);
require("./routes/OrgRoutes")(app);
require("./routes/GroupRoutes")(app);
require("./routes/SellerRoutes")(app);
require("./routes/ItemRoutes")(app);
require("./routes/OrderRoutes")(app);
require("./routes/ItemElementRotues")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT);
