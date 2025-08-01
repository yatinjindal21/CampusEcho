const express = require('express');
const multer = require('multer');
const { sendReferral, getMyRequests, respondToReferral, getSentReferrals } = require('../controllers/referralRequestController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // ✅ get original extension
      const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, uniqueName);
    }
  });
  
  const upload = multer({ storage });

// Students send request
router.post('/request', verifyToken, authorizeRoles('student'), upload.single('resume'), sendReferral);

// Alumni view incoming requests
router.get('/my-requests', verifyToken, authorizeRoles('alumni'), getMyRequests);

// Alumni respond
router.post('/respond/:id', verifyToken, authorizeRoles('alumni'), respondToReferral);

// Student view sent requests
router.get('/sent', verifyToken, authorizeRoles('student'), getSentReferrals);


module.exports = router;
