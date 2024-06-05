module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define('Hotel', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        checkInDate: DataTypes.DATE,
        checkOutDate: DataTypes.DATE,
        tripId: DataTypes.INTEGER
    });
    Hotel.associate = (models) => {
        Hotel.belongsTo(models.Trip, { foreignKey: 'tripId' });
    };
    return Hotel;
};