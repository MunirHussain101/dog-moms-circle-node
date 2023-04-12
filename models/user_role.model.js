module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("user_roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
        },
        roleId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'roles',
                key: 'id',
            },
        }
    })

    return UserRoles;
};