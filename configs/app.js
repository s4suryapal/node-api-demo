const express = require('express');
const redis = require('redis');
const helmet = require("helmet");


const jwt = require('jsonwebtoken');
const compress = require('compression');
const fs = require('fs');
const morgan = require('morgan')
const path = require('path');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const swaggerDoc = require('../api-doc/swagger.json');
const errorHandler = require('../app/middlewares/error');

// const userRouter = require('../app/routers/userRoutes');

// Start express app
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}

//set morgan logger
let accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
  
  res.send('Welcome to node default project');
});
app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(swaggerDoc,{explorer : true}));

// app.use('/users',userRouter);


app.use(errorHandler);

// app.use((req,res,next)=>{
//   res.cookie('X-CSRF-Token', req.csrfToken(), { sameSite: true });
// });
module.exports = app;