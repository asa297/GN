module.exports = io => {
  io.on("connection", function(client) {
    client.on("joinroom", function(data) {
      const { _id } = data.auth;
      client.join(_id);
    });

    client.on("showitem", function(data) {
      const {
        auth: { _id },
        _getCustomer
      } = data;

      console.log("send item");
      io.to(_id).emit("showitem", _getCustomer);
    });

    client.on("dc", function(data) {
      console.log("send dc");

      const {
        auth: { _id },
        value
      } = data;

      io.to(_id).emit("dc", value);
    });

    client.on("credit", function(data) {
      console.log("send credit");

      const {
        auth: { _id },
        value
      } = data;

      io.to(_id).emit("credit", value);
    });

    client.on("creditcharge", function(data) {
      console.log("send creditcharge");
      const {
        auth: { _id },
        value
      } = data;

      io.to(_id).emit("creditcharge", value);
    });

    client.on("closepo", function(data) {
      console.log("closepo");
      const {
        auth: { _id }
      } = data;

      io.to(_id).emit("closepo", {});
    });

    client.on("openpo", function(data) {
      console.log("openpo");
      const {
        auth: { _id }
      } = data;

      io.to(_id).emit("openpo", {});
    });

    client.on("submitpo", function(data) {
      console.log("submitpo");
      const {
        auth: { _id },
        receivecash
      } = data;

      io.to(_id).emit("submitpo", receivecash);
    });
  });
};
