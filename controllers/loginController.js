
// Controller for Login page
const db = require('../db');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.render('login', { title: 'Login', error: 'Email and password are required' });
  }

  if (!validateEmail(email)) {
    return res.render('login', { title: 'Login', error: 'Please enter a valid email address' });
  }

  if (password.length < 6) {
    return res.render('login', { title: 'Login', error: 'Password must be at least 6 characters long' });
  }

  // Query to check user
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length > 0) {
      // Successful login
      res.redirect('/dashboard');
    } else {
      // Failed login
      res.render('login', { title: 'Login', error: 'Invalid email or password' });
    }
  });
};