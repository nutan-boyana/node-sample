const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

// Route to display home page
router.get('/', homeController.getHome);

// Route to display about us page
router.get('/about-us', homeController.getAboutUs);

// Route to display contact us page
router.get('/contact-us', homeController.getContactUs);

// Route to display login page
router.get('/login', loginController.getLogin);

// Route to handle login POST
router.post('/login', loginController.postLogin);

// Route to display register page
router.get('/register', registerController.getRegister);

// Route to handle register POST
router.post('/register', registerController.postRegister);

module.exports = router;
