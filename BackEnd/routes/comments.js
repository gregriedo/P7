const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentsCtrl = require('../controllers/comments');

router.get('/', auth, commentsCtrl.getAllComment);
router.post('/', auth, multer, commentsCtrl.createNewComment);
router.get('/:id', auth, commentsCtrl.getOneComment);
router.put('/:id', auth, multer, commentsCtrl.modifyComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;
 