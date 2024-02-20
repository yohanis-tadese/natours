const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');
const reviewRouter = require('./routers/reviewRoutes');

const app = express();

// Global Middlewares

// 1) Setting security HTTP headers only put the first middeleware
app.use(helmet());

// 2) Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3) Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// 4) Body parser, reading data from body into, req.body
app.use(express.json({ limit: '10kb' }));

// 5) Data sanitization against NOSQL query injection
app.use(mongoSanitize()); // to work remove all dolar signs and not login

// 6) Data sanitization againest XSS
app.use(xss());

// 7) Prevent parameters pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'difficulty',
      'price',
    ],
  })
);

// 8) Serving static files
app.use(express.static(`${__dirname}/public`));

// 9) Just test middeleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routs Mounting Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  const err = new AppError(`Cant find ${req.originalUrl} on this server!`, 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
