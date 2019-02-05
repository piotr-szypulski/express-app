const express = require('express');
const router = express.Router();
let users = require('../public/users.json');
const fs = require('fs');
const path = require('path');
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const usersPath = `${__dirname}/../public/users.json`;

router.get('/', (req, res, next) => {
  const { add, edit, init } = req.query;

  const emptyFields = Object.keys(req.query)
    .filter(field => req.query[field] === '');
  
  if (init === 'true' || emptyFields.length > 0) {
    res.render('edit', {
      fields: req.query,
    });
  } else {
    const fields = {
      firstName: req.query['first-name'],
      lastName: req.query['last-name'],
      login: req.query.login,
      pass: req.query.pass,
    };
        
    const loginExists = users.filter(user => user.login === fields.login).length > 0;

    if (add === 'true') {
      if (loginExists) {
        res.render('edit', {
          fields: req.query,
          error: 'Login already exists, please try different one',
        });
      } else {
        users.push(fields);

        writeFile(usersPath, JSON.stringify(users, null, 2))
        .then(res.redirect('/users'));
      }
    }

    if (edit === 'true') {
      if (loginExists) {
        const updatedUsers = users.map((user) => {
          if (user.login === fields.login) {
            return fields;
          }
          return user;
        });

        users = updatedUsers;
      } else {
        users.push(fields);
      }

      // writeFile(usersPath, JSON.stringify(users, null, 2))
      //   .then(() => {
      //     console.log(require('../public/users.json'));
      //     res.redirect('/users');
      //   });
      fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
        if (err) return console.log(err);
        res.redirect('/users');
      });
    }
  }
});

module.exports = router;
