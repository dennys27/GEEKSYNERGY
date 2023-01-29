const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://dennys:dennysjoseph1999@cluster0.gam9wuq.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("db connected");
    })
    .catch((e) => {
      console.log("db not connected");
    });
};

module.exports = connect;
