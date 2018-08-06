const cookie = require("cookie");
module.exports = io => {
  io.on("connection", function(client) {
    const parserCookie = cookie.parse(client.request.headers.cookie);
    client.join(parserCookie["session.sig"]);

    client.on("showitem", function(data) {
      io.to(parserCookie["session.sig"]).emit("showitem", data);
    });

    client.on("grandtotal", function(data) {
      io.to(parserCookie["session.sig"]).emit("grandtotal", data);
    });

    // client.on("closePO", function(data) {
    //   client.broadcast.emit("closePO", data);
    // });
  });
};
