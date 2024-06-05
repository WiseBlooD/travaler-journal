module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        photoId: DataTypes.INTEGER
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.Photo, { foreignKey: 'photoId' });
        Comment.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Comment;
};