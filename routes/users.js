const express = require('express');
const router = express.Router();
const fs = require('fs');

const usersPath = `${__dirname}/../public/users.json`;

router.get('/', (req, res) => {
  if (!req.session.login) {
    res.redirect('/login');
  }

  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      return console.error(err);
    }

    const users = JSON.parse(data);

    res.render('users', {
      name: req.session.login,
      users: users,
    });
  });
});

module.exports = router;
