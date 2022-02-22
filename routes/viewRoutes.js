const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTours);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignUpForm);

module.exports = router;
