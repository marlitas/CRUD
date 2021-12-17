const express = require('express');
const router = express.Router();

//Import user controller methods
const {
    newUser
} = require('../controllers/usersController');

router.route('/users/new').post(newUser);

module.exports = router;