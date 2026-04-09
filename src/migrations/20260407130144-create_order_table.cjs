"use strict";

/** @type {import('sequelize-cli').Migration} */
const tableModel = {
  schema: "hyperlocal_shop_ordering",
  tableName: "orders",
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
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
       shop_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
       product_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      commission: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true,
      },
      final_amount:{
      type:Sequelize.DECIMAL(10,2),
      allowNull:true
      },
       status: {
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
