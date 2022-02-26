var express = require('express');
var router = express.Router();
const CitizenController = require('../controllers/citizenController')
const Auth = require('../middlewares/auth')

/* GET users listing. */
router.post('/register', Auth.authToken, CitizenController.registerCitizen);
router.get('/', Auth.authToken, CitizenController.getCitizens);

module.exports = router;
