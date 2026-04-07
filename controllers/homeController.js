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