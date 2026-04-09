"use strict";

import { Model } from "sequelize";

export function productModel(sequelize, DataTypes) {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Shop, { foreignKey: "shop_id" });
      Product.hasMany(models.Order, { foreignKey: "product_id" });
    }
  }

  Product.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      shop_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      product_name_en: {
        type: DataTypes.STRING,
      },
      product_name_hi: {
        type: DataTypes.STRING,
      },
      product_name_mr: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      discount_price: {
        type: DataTypes.FLOAT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.STRING,
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
      modelName: "products",
      timestamps: false,
    }
  );

  return Product;
}