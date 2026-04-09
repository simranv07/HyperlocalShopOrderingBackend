"use strict";

import { Model } from "sequelize";

export function orderModel(sequelize, DataTypes) {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Shop, { foreignKey: "shop_id" });
      Order.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }

  Order.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      customer_name: {
        type: DataTypes.STRING,
      },
      mobile_number: {
        type: DataTypes.STRING,
      },
      shop_id: {
        type: DataTypes.UUID,
      },
      product_id: {
        type: DataTypes.UUID,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      total_price: {
        type: DataTypes.FLOAT,
      },
      commission: {
        type: DataTypes.FLOAT,
      },
      final_amount: {
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "accepted",
          "rejected",
          "completed"
        ),
        defaultValue: "pending",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "orders",
      timestamps: false,
    }
  );

  return Order;
}