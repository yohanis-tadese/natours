const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, ':', err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {}).then(() => {
  console.log('DB is connected sucessfuly ...');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`The server is started on port ...`);
});

//HANDLE: unhandledErrors
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  //First the server is close and exit the process gracefully
  server.close(() => {
    process.exit(1);
  });
});
