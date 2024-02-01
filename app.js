const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');

const app = express();

// 1) Middlewares
app.use(express.json()); //Middleware to parse JSON data
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //Use third party middleware morgan for Logging for HTTP requests
}

app.use(express.static(`${__dirname}/public`)); // Serve static files from the 'public' directory

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routs
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use((err, req, res, next) => {});

module.exports = app;
