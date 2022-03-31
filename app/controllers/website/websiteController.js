const websiteController = {
  home(_req, res) {
    res.render('home', { title: 'Title of the API' });
  },
};

module.exports = { websiteController };
