const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/home');
const contactRoutes = require('./routes/home');

// Use routes
app.use('/', homeRoutes);
app.use('/about-us', aboutRoutes);
app.use('/contact-us', contactRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
