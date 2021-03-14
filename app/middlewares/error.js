// const logger = require('../../configs/logging').logger;
require('express-async-errors');
module.exports = function (err, req, res, next) {
    //return res.status(500).send('Something failed');
    if (err.name == 'ValidationError') {
        // logger.error('DB Error :', err);
        console.log(err);
        return res.status(422).json(err.message);
    } else {
        // logger.error(err);
        console.log(err);
        // console.log(util.inspect(err, false, null));
        return res.status(500).json(err.message);
    }
}