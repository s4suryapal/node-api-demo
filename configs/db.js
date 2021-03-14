const mongoose = require('mongoose');

module.exports = function(logger) {
  const db = process.env.DB;
  mongoose.connect(db, {useNewUrlParser: true,useFindAndModify:false, useUnifiedTopology: true})
    .then(() => logger.info(`Connected to ${db}...`));
    // .then(() => console.log(`Connected to ${db}...`));
}