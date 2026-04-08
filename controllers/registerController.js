const db = require('../db');
const bcrypt = require('bcryptjs');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

exports.getRegister = (req, res) => {
  res.render('register', { title: 'Register', message: '' });
};

exports.postRegister = (req, res) => {
  const { email, password, passwordConfirm } = req.body;

  // Validation
  if (!email || !password || !passwordConfirm) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
  }

  // Check if user already exists
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email is already in use'
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Insert user into database
    const insertQuery = 'INSERT INTO users SET ?';
    db.query(insertQuery, { email: email, password: hashedPassword }, (err, results) => {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error'
        });
      }

      return res.status(201).json({
        success: true,
        message: 'User registered successfully!',
        userId: results.insertId
      });
    });
  });
};