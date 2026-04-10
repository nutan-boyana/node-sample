const connection = require('../db');

// Get all users
exports.getAllUsers = (req, res) => {
  const query = 'SELECT id, email FROM users';
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error fetching users',
        error: error.message 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      count: results.length,
      data: results 
    });
  });
};

// Get users by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT id, email FROM users WHERE id = ?';
  
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error fetching user',
        error: error.message 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      count: results.length,
      data: results 
    });
  });
};
