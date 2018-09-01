const cookie = require("cookie");
module.exports = io => {
  console.log("run io au eiei")
  io.on("connection", function(client) {
    // const parserCookie = cookie.parse(client.request.headers.cookie);
    // client.join(parserCookie["session.sig"]);

    client.on('joinroom' , function(data){
      
    })

    // client.on("showitem", function(data) {
    //   console.log("send item");
    //   io.to(parserCookie["session.sig"]).emit("showitem", data);
    // });

    // client.on("dc", function(data) {
    //   console.log("send dc");
    //   io.to(parserCookie["session.sig"]).emit("dc", data);
    // });

    // client.on("credit", function(data) {
    //   console.log("send credit");
    //   io.to(parserCookie["session.sig"]).emit("credit", data);
    // });

    // client.on("creditcharge", function(data) {
    //   console.log("send creditcharge");
    //   io.to(parserCookie["session.sig"]).emit("creditcharge", data);
    // });

    // client.on("closepo", function(data) {
    //   console.log("closepo");
    //   io.to(parserCookie["session.sig"]).emit("closepo", data);
    // });

    // client.on("openpo", function(data) {
    //   console.log("openpo");
    //   io.to(parserCookie["session.sig"]).emit("openpo", data);
    // });

    // client.on("submitpo", function(data) {
    //   console.log("submitpo");
    //   io.to(parserCookie["session.sig"]).emit("submitpo", data);
    // });

  });
};
