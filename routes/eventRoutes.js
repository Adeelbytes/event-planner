const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/auth');

router.post('/events', authMiddleware, eventController.createEvent);
router.get('/events', authMiddleware, eventController.getEvents);

module.exports = router;