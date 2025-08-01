const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createNews, getNews, approveNews, getNewsById } = require('../controllers/newsController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// ✅ Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ✅ upload location
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique filenames
  }
});
const upload = multer({ storage: storage });

// ✅ Use multer here BEFORE createNews
router.post(
  '/',
  upload.array('files'),
  verifyToken,
  authorizeRoles('admin', 'society_head', 'alumni'), // ✅ added 'alumni'
  createNews
);


router.get('/', verifyToken, getNews);
router.patch('/approve/:id', verifyToken, authorizeRoles('admin'), approveNews);
router.get('/:id', verifyToken, getNewsById);


module.exports = router;
