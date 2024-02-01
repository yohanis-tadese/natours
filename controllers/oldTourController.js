const fs = require('fs');
const tourModel = require('../models/tourModel');

// 2) Tour Route handler
//GET ALL TOURS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

const CheckBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Please include both name and price !',
    });
  }
  next();
};

const getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'sucess',
    createdAt: req.requestTime,
    data: {
      tours,
    },
  });
};

//Responding Url Parameter
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // automatically changes string to number trick
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'sucess',
    data: {
      tour,
    },
  });
};

//CREATE NEW TOURS
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  const newTours = tours.push(newTour);
  // console.log(newTours); // to see length of new tours

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//Updated Tours
const updateTour = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: 'Updated tour here',
    },
  });
};

//Delete Tours
const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'sucess',
    data: {
      tour: 'Null',
    },
  });
};

module.exports = {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  CheckBody,
};
