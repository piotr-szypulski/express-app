const express = require('express');
const router = express.Router();
const fs = require('fs');
const { promisify } = require('util');

const usersPath = `${__dirname}/../public/users.json`;

const loadJSON = async (jsonPath) => {
  if (jsonPath === undefined || jsonPath === null || jsonPath.length === 0) {
    console.error('The path to JSON file is incorrect.');
  }
  const readFileAsync = promisify(fs.readFile);

  try {
    const json = await readFileAsync(jsonPath, {encoding: 'utf8'});
    return JSON.parse(json);
  }
  catch (err) {
    console.error(err);
    return null;
  }
};

router.get('/', (req, res) => {
  if (!req.session.login) {
    res.redirect('/login');
  }

  loadJSON(usersPath)
    .then((users)=> {
      res.render('users', {
        name: req.session.login,
        users: users,
      });
    })
});

module.exports = {
  loadJSON,
  router,
};
