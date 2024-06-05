const { Trip, Hotel, Photo, Comment } = require('../models');

const createTrip = async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    try {
        const trip = await Trip.create({
            title,
            description,
            startDate,
            endDate,
            userId: req.user.id
        });
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ error: 'Error creating trip' });
    }
};

const getTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll({ where: { userId: req.user.id } });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching trips' });
    }
};

module.exports = { createTrip, getTrips };