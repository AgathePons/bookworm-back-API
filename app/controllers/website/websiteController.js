const websiteController = {
  home(_req, res) {
    res.render('home', { title: 'Bookworm API' });
  },
};

module.exports = { websiteController };
