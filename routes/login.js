const express = require('express');
const router = express.Router();
const users = require('../public/users.json');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  const userMatch = users.filter(user => user.login === req.body.login)[0];

  if (userMatch && req.body.pass === userMatch.pass) {
    req.session.login = userMatch.firstName;
    console.log(req.session.login);
    res.redirect('/');
  } else {
    res.render('login', {
      error: 'Wrong username/password',
    });
  }
})

module.exports = router;