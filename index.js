require('dotenv').config();

// Call logger to log errors
const logger = require('./configs/logging').logger;

// Connect to mongoDB by passing logger object to log db error
require('./configs/db')(logger);

// get app data
const app = require('./configs/app');

//START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    logger.info(`App running on port ${port}...`);
    // console.log(`App running on port ${port}...`);
});
