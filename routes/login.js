const express = require('express');
const router = express.Router();
const users = require('../public/users.json');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const userMatch = users.filter(user => user.login === req.body.login)[0];

  if (userMatch && req.body.pass === userMatch.pass) {
    req.session.login = userMatch.firstName;
    res.redirect('/');
  } else {
    res.render('login', {
      error: 'Wrong username/password',
    });
  }
});

module.exports = router;