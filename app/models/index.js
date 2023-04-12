const config = require("../../db/databasepg");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../../models/user.model")(sequelize, Sequelize);
db.Role = require("../../models/role.model.js")(sequelize, Sequelize);
db.UserRoles = require("../../models/user_role.model")(sequelize, Sequelize);
// sequelize.sync({ force: true, alter: true });

db.User.hasMany(db.UserRoles, { foreignKey: 'userId' })
db.UserRoles.belongsTo(db.User, { foreignKey: 'userId' })


db.Role.hasMany(db.UserRoles, { foreignKey: 'roleId' })
db.UserRoles.belongsTo(db.Role, { foreignKey: 'roleId' })

db.ROLES = ["user", "admin"];

module.exports = db;