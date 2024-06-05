const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('Token:', token);

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                console.log('Token verification error:', err);
                return res.status(403).json({ error: 'Invalid token' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};

module.exports = authenticateJWT;
