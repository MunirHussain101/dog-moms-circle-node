'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('breeds', [
    {
      name: 'pug',
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
   await queryInterface.bulkInsert('roles', [
    {
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
