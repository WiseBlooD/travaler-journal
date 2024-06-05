const express = require('express');
const { getUser, updateUser } = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/user', authenticateJWT, getUser);
router.put('/user', authenticateJWT, updateUser);

module.exports = router;
