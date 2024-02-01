const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const Tour = require('../../models/tourModel');

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

//READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('The tour have susessfully Created.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETED ALL TO DATABASE
const deletetData = async () => {
  try {
    await Tour.deleteMany();
    console.log('The tour have susessfully Deleted.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deletetData();
}
