const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Journal = require('./journal')(sequelize, DataTypes);

db.Journal.associate = (models) => {
    db.Journal.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = db;
