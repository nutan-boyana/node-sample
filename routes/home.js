const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Route to display home page
router.get('/', homeController.getHome);

// Route to display about us page
router.get('/about-us', homeController.getAboutUs);

// Route to display contact us page
router.get('/contact-us', homeController.getContactUs);


module.exports = router;
