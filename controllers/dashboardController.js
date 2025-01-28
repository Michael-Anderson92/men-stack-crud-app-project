// controllers/dashboardController.js
const dashboardController = {
  getDashboard: (req, res) => {
    res.render('dashboard/home', {
      user: req.session.user,
      links: [
        { name: 'Weight Management', path: `/users/${req.session.user._id}/myweight` },
        { name: 'Med Tracking', path: `/users/${req.session.user._id}/mymeds` },
        { name: 'Fitness Tracking', path: `/users/${req.session.user._id}/myfitness` },
        { name: 'Sleep Tracking', path: `/users/${req.session.user._id}/mysleep` },
        { name: 'Mental Health', path: `/users/${req.session.user._id}/mymind` },
      ],
    });
  },
};

module.exports = dashboardController;
