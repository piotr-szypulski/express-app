const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

  if (req.session.login) {
    res.redirect('/users');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
