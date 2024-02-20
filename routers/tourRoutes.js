const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRoutes = require('../routers/reviewRoutes');

const router = express.Router();

//Mounting nested routes
router.use('/:tourId/reviews', reviewRoutes);

//Top s chep tours
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopCheapTours, tourController.getAllTour);

//tour-stats Aggreration
router.route('/tour-stats').get(tourController.getTourStats);

//calcualte busiest month Aggreration
router
  .route('/monthly-plane/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.monthlyPlane
  );

//Tour router
router
  .route('/')
  .get(authController.protect, tourController.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
