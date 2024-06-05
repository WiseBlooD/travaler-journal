module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define('Trip', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        userId: DataTypes.INTEGER
    });
    Trip.associate = (models) => {
        Trip.belongsTo(models.User, { foreignKey: 'userId' });
        Trip.hasMany(models.Hotel, { foreignKey: 'tripId' });
        Trip.hasMany(models.Photo, { foreignKey: 'tripId' });
    };
    return Trip;
};