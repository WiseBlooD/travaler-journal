const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', journalRoutes);
app.use('/api', userRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
