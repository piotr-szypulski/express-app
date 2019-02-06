const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const usersPath = `${__dirname}/../public/users.json`;

router.get('/', (req, res, next) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) return console.log(err);
    let users = JSON.parse(data);

    const updatedUsers = users.filter(user => user.login !== req.query.login);

    fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 2), (err) => {
      if (err) return console.log(err);
      res.redirect('/users');
    });
  });
});

module.exports = router;