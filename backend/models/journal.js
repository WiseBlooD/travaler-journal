module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('Journal', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER
    });
    return Journal;
};
