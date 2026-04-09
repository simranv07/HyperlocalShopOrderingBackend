import { orderModel } from "../pg-models/order.js";
import { productModel } from "../pg-models/product.js";
import { shopModel } from "../pg-models/shop.js";
export const getModels = (sequelize, Sequelize) => {
  const Shop = shopModel(sequelize, Sequelize);
  const Product = productModel(sequelize, Sequelize);
  const Order = orderModel(sequelize, Sequelize);

  return {
    Shop,
    Product,
    Order
  };
};
