const express = require('express');
const { createJournal, getJournals } = require('../controllers/journalController');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/journals', authenticateJWT, createJournal);
router.get('/journals', authenticateJWT, getJournals);

module.exports = router;
