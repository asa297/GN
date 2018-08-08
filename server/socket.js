const cookie = require("cookie");
module.exports = io => {
  io.on("connection", function(client) {
    const parserCookie = cookie.parse(client.request.headers.cookie);
    client.join(parserCookie["session.sig"]);

    client.on("showitem", function(data) {
      console.log("send item");
      io.to(parserCookie["session.sig"]).emit("showitem", data);
    });

    client.on("dc", function(data) {
      console.log("send dc");
      io.to(parserCookie["session.sig"]).emit("dc", data);
    });

    client.on("credit", function(data) {
      console.log("send credit");
      io.to(parserCookie["session.sig"]).emit("credit", data);
    });

    client.on("creditcharge", function(data) {
      console.log("send creditcharge");
      io.to(parserCookie["session.sig"]).emit("creditcharge", data);
    });
  });
};
