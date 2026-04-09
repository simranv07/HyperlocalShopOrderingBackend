import { BAD_REQUEST_ERROR_CODE } from "../../constant/statusConstant.js";
import { getConnection } from "../dbConnection.js";
import { createCustomErrorResponse } from "../utils.js";
import {Op} from 'sequelize';

const DB = await getConnection();

export const getShopDetail = async (data) => {
  try {
    return await DB.Shop.findOne({
      where: data,
    });
  } catch (error) {
    console.error("Error occurred in getShopDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to find shop",
      error
    );
  }
};

export const insertShopDetail = async (data) => {
  try {
    return await DB.Shop.create(data);
  } catch (error) {
    console.error("Error occurred in insertShopDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to create shop",
      error
    );
  }
};

export const updateShopDetail = async (data) => {
  try {
    return await DB.Shop.update(data, {
      where: {
        id: data.id,
      },
    });
  } catch (error) {
    console.error("Error occurred in updateShopDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to update shop",
      error
    );
  }
};

export const listShopDetail = async (limit, offset, data) => {
  try {
    let whereClause = {};

    if (Object.keys(data).length) {
        if (data.shop_name) {
        whereClause["shop_name"] = {
            [Op.iLike]: `%${data.shop_name}%`, 
        };
        }

        if (data.hasOwnProperty("category")) {
        whereClause.category = {
            [Op.iLike]: `%${data.category}%`, 
        };
        }
    }

    return await DB.Shop.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: DB.Product,
        },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });
  } catch (error) {
    console.error("Error occurred in listShopDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to found shop list",
      error
    );
  }
};

export const deleteShopDetail = async (data) => {
  try {
    return DB.Shop.destroy({ where: data });
  } catch (error) {
    console.error("Error occurred in deleteShopDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      UNABLE_TO_DELETE_BAND,
      error
    );
  }
};
