"use strict";

import { Model } from "sequelize";

export function shopModel(sequelize, DataTypes) {
  class Shop extends Model {
    static associate(models) {
      Shop.hasMany(models.Product, { foreignKey: "shop_id" });
      Shop.hasMany(models.Order, { foreignKey: "shop_id" });
    }
  }

  Shop.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      shop_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      category: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      opening_time: {
        type: DataTypes.STRING,
      },
      closing_time: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "shops",
      timestamps: false,
    }
  );

  return Shop;
}