// controllers/dashboardController.js
const dashboardController = {
  getDashboard: (req, res) => {
    res.render('dashboard/home', {
      user: req.session.user,
      links: [
        { name: 'Weight Management', path: `/users/${req.session.user._id}/weight` },
        { name: 'Med Tracking', path: `/users/${req.session.user._id}/medications` },
        { name: 'Fitness Tracking', path: `/users/${req.session.user._id}/fitness` },
        { name: 'Sleep Tracking', path: `/users/${req.session.user._id}/sleep` },
        { name: 'Mental Health', path: `/users/${req.session.user._id}/mentalhealth` },
      ],
    });
  },
};

module.exports = dashboardController;
