module.exports = function(sequelize, DataTypes) {
  var Classroom = sequelize.define('Classroom', {
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      	len: [1]
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    period: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },    
    grade: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },    
    schoolyear: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    }   
  });

  return Classroom;
}