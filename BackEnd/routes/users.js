const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config');
const passwordValidator = require('../middleware/password');

const userCtrl = require('../controllers/users');

router.post('/signup', multer, passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.findOneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
