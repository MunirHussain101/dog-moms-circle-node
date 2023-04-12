module.exports =  (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        isEmail: true,
      },
      password: {
        type: Sequelize.STRING(64),
        min: 6
      },
      zipCode: {
        type: Sequelize.STRING(8),
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaulValue: false
      }
    });
  
    return User;
  };