const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, category, reminder } = req.body;
        const event = new Event({ name, description, date, category, reminder, user: req.userId });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.userId }).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};