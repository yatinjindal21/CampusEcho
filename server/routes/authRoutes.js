const express = require('express');
const router = express.Router();
const { register, login, getMe, adminRegisterUser } = require('../controllers/authController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.post('/admin/register-user', verifyToken, authorizeRoles('admin'), adminRegisterUser);
router.get('/all-users', verifyToken, authorizeRoles('admin', 'student', 'alumni'), getAllUsers);

module.exports = router;