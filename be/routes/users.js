var express = require('express');
var router = express.Router();

const Users = require('../controllers/users')

/* GET users listing. */
// router.get('/signup', Users.signup);
router.post('/signup', Users.signup);
// router.all('/signup', Users.signup);
router.post('/signin', Users.signin);
module.exports = router;
