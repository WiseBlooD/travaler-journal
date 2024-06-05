module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        url: DataTypes.STRING,
        description: DataTypes.TEXT,
        tripId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    });
    Photo.associate = (models) => {
        Photo.belongsTo(models.Trip, { foreignKey: 'tripId' });
        Photo.belongsTo(models.User, { foreignKey: 'userId' });
        Photo.hasMany(models.Comment, { foreignKey: 'photoId' });
    };
    return Photo;
};