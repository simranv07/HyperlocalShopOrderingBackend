import { BAD_REQUEST_ERROR_CODE } from "../../constant/statusConstant.js";
import { getConnection } from "../dbConnection.js";
import { createCustomErrorResponse } from "../utils.js";

const DB = await getConnection();

export const placeOrderDetail = async (data) => {
  try {
    return await DB.Order.create(data);
  } catch (error) {
    console.error("Error occurred in placeOrderDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to  place order",
      error
    );
  }
};
export const listOrderDetail = async (limit, offset, data) => {
  try {
    let whereClause = {};
    whereClause.shop_id=data.shop_id;
    if(data.hasOwnProperty("status")){
        whereClause.status= data.status
    }
    return await DB.Order.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: DB.Product,
          include:[
            {
            model:DB.Shop,
            attributes: [
            "id",
            "shop_name",
            "mobile_number",
            "category",
            "address",
            "city",
            "opening_time",
            "closing_time",
          ],
            }
          ]
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
export const getOrderDetail = async (data) => {
  try {
    return await DB.Order.findOne({
      where: data,
    });
  } catch (error) {
    console.error("Error occurred in getOrderDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to find order",
      error
    );
  }
};

export const updateOrderDetail = async (data) => {
  try {
    return await DB.Order.update(data, {
      where: {
        id: data.id,
      },
      returning: true,
      plain: true,
    });
  } catch (error) {
    console.error("Error occurred in updateOrderDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to update order",
      error
    );
  }
};