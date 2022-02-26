var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController')
const Auth = require('../middlewares/auth')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signup', UserController.Signup);
router.post('/admin/registerCorper', Auth.authToken, UserController.registerCorper);
router.post('/login', UserController.login);

module.exports = router;
