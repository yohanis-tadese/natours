const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

//Top s chep tours
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopCheapTours, tourController.getAllTour);

//tour-stats Aggreration
router.route('/tour-stats').get(tourController.getTourStats);

//calcualte busiest month Aggreration
router.route('/monthly-plane/:year').get(tourController.monthlyPlane);

//Tour router
router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
