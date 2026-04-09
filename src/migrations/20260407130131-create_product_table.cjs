"use strict";

/** @type {import('sequelize-cli').Migration} */
const tableModel = {
  schema: "hyperlocal_shop_ordering",
  tableName: "products",
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
      shop_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      product_name_en: {
        type: Sequelize.STRING,
        allowNull: true,
      },
       product_name_hi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
       product_name_mr: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      discount_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category:{
      type:Sequelize.STRING,
      allowNull:true
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
