const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log('DB is connected sucessfuly ...');
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`The server is started on port ...`);
});
