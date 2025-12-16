const express = require('express');
const router = express.Router(); 
const auth = require('../middleware/authMiddleware');
const Event = require('../models/Event');

// ==========================================
// 1. CREATE EVENT (Private)
// ==========================================
// @route   POST /api/events
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, date, location, capacity, image } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            capacity,
            image,
            organizer: req.user.id
        });

        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ==========================================
// 2. GET ALL EVENTS (Public)
// ==========================================
// @route   GET /api/events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 }).populate('organizer', 'name');
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ==========================================
// 3. GET SINGLE EVENT (Public)
// ==========================================
// @route   GET /api/events/:id
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'name');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') return res.status(404).json({ message: 'Event not found' });
        res.status(500).send('Server Error');
    }
});

// ==========================================
// 4. RSVP SYSTEM (Private & Thread-Safe)
// ==========================================
// @route   POST /api/events/:id/rsvp
router.post('/:id/rsvp', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const userId = req.user.id;

        // Check if user is already an attendee
        if (event.attendees.includes(userId)) {
            // --- LEAVE EVENT ---
            await Event.findByIdAndUpdate(req.params.id, {
                $pull: { attendees: userId }
            });
            return res.json({ message: "You have left the event", status: "left" });
        } else {
            // --- JOIN EVENT (Concurrency Safe) ---
            const updatedEvent = await Event.findOneAndUpdate(
                { 
                    _id: req.params.id, 
                    $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] } 
                },
                { 
                    $addToSet: { attendees: userId } 
                },
                { new: true } 
            );

            if (!updatedEvent) {
                return res.status(400).json({ message: "Event is full or request failed" });
            }

            return res.json({ message: "RSVP Successful", status: "joined" });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;


// @route   GET /api/events/user/dashboard
// @desc    Get events created by user & events user is attending
router.get('/user/dashboard', auth, async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Find events created by this user
        const createdEvents = await Event.find({ organizer: userId });

        // 2. Find events where this user is an attendee
        const attendingEvents = await Event.find({ attendees: userId }).populate('organizer', 'name');

        res.json({ createdEvents, attendingEvents });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event (Only if user is organizer)
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check if user is the organizer
        if (event.organizer.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this event' });
        }

        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});