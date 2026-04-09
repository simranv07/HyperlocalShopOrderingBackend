"use strict";

/** @type {import('sequelize-cli').Migration} */
const tableModel = {
  schema: "hyperlocal_shop_ordering",
  tableName: "shops",
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tableModel, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      shop_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      opening_time:{
      type:Sequelize.STRING,
      allowNull:true
      },
      closing_time:{
      type:Sequelize.STRING,
      allowNull:true
      },
      password :{
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(tableModel);
  },
};
