const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('db connection successful');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
