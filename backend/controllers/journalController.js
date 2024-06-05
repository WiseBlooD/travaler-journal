const { Journal } = require('../models');

const createJournal = async (req, res) => {
    const { title, content } = req.body;
    try {
        const journal = await Journal.create({ title, content, userId: req.user.id });
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: 'Error creating journal' });
    }
};

const getJournals = async (req, res) => {
    try {
        const journals = await Journal.findAll({ where: { userId: req.user.id } });
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching journals' });
    }
};

module.exports = { createJournal, getJournals };
