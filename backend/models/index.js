const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Journal = require('./journal')(sequelize, DataTypes);
db.Trip = require('./trip')(sequelize, DataTypes);
db.Hotel = require('./hotel')(sequelize, DataTypes);
db.Photo = require('./photo')(sequelize, DataTypes);
db.Comment = require('./comment')(sequelize, DataTypes);

db.Trip.associate(db);
db.Hotel.associate(db);
db.Photo.associate(db);
db.Comment.associate(db);

module.exports = db;
