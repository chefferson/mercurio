module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    body: DataTypes.STRING,

  });

  Answer.associate = (models) => {
    Answer.hasMany(models.Photo, {
      foreignKey: 'answer_id',
    });
  };

  return Answer;
};
