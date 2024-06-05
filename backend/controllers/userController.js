const { User } = require('../models');

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user data' });
    }
};

const updateUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user data' });
    }
};

module.exports = { getUser, updateUser };

