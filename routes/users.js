const express = require('express');
const router = express.Router();
const users = require('../public/users.json');

router.get('/', (req, res, next) => {
  res.render('users', {
    name: req.session.login,
    users: users,
  });
});

module.exports = router;
