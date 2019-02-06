const express = require('express');
const router = express.Router();
const fs = require('fs');

const usersPath = `${__dirname}/../public/users.json`;

router.get('/', (req, res) => {
  fs.readFile(usersPath, 'utf-8', (err, data) => {
    if (err) {
      return console.error(err);
    }

    let users = JSON.parse(data);
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

          fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
          res.redirect('/users');
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

        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
        res.redirect('/users');
      }
    }
  });
});

module.exports = router;
