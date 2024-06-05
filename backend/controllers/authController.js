const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'your_refresh_secret_key';

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' }); // 1 час
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' }); // 7 дней
    return { accessToken, refreshToken };
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const tokens = generateTokens(user);
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

const refresh = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ error: 'Access denied' });
    }
    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        const tokens = generateTokens(user);
        res.json(tokens);
    });
};

module.exports = { register, login, refresh };
