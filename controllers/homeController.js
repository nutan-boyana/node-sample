// Controller for Home page
exports.getHome = (req, res) => {
  res.render('index', { message: 'hello world', title: 'Home' });
};

// Controller for About Us page
exports.getAboutUs = (req, res) => {
  res.render('about', { title: 'About Us' });
};

// Controller for Contact Us page
exports.getContactUs = (req, res) => {
  res.render('contact', { title: 'Contact Us' });
};

// Controller for Users page
exports.getUsers = (req, res) => {
  const connection = require('../db');
  const query = 'SELECT id, email FROM users';
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      return res.render('users', { users: [], title: 'Users', error: 'Error fetching users' });
    }
    
    res.render('users', { users: results, title: 'Users', error: null });
  });
};