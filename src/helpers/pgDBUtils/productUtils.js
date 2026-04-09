import { BAD_REQUEST_ERROR_CODE } from "../../constant/statusConstant.js";
import { getConnection } from "../dbConnection.js";
import { createCustomErrorResponse } from "../utils.js";
import { Op } from "sequelize";

const DB = await getConnection();

export const insertProduceDetail = async (data) => {
  try {
    return await DB.Product.create(data);
  } catch (error) {
    console.error("Error occurred in insertProduceDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to create product",
      error
    );
  }
};
export const getProductDetail = async (data) => {
  try {
    return await DB.Product.findOne({
      where: data,
    });
  } catch (error) {
    console.error("Error occurred in getProductDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to find shop",
      error
    );
  }
};


export const updateProductDetail = async (data) => {
  try {
    return await DB.Product.update(data, {
      where: {
        id: data.id,
      },
      returning: true,
      plain: true,
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

export const listProductDetail = async (limit, offset, data) => {
  try {
    let whereClause = {};
    if(data.hasOwnProperty("shop_id")){
        whereClause.shop_id= data.shop_id
    }

    return await DB.Product.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: DB.Shop,
          attributes:["id","shop_name","mobile_number","category","address","city","opening_time","closing_time"]
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

export const deleteProductDetail = async (data) => {
  try {
    return DB.Product.destroy({ where: {
         id: {
            [Op.in]: data.id
            }
         }
     });
  } catch (error) {
    console.error("Error occurred in deleteProductDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      UNABLE_TO_DELETE_BAND,
      error
    );
  }
};

export const getMultipleProductDetail = async (data) => {
  try {
    const ids = data.id; 

    const products = await DB.Product.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
        shop_id:data.shop_id
      },
      attributes: ["id"], 
    });
    
    const foundIds = products.map((p) => p.id);

    const missingIds = ids.filter((id) => !foundIds.includes(id));

    return missingIds;
  } catch (error) {
    console.error("Error occurred in getProductDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to find product",
      error
    );
}
};

export const listCustomerProductDetail = async (limit, offset, data) => {
  try {
    let whereClause = {};
    let attributes = ["id", "shop_id","price", "discount_price", "description", "category"];

    if (data.hasOwnProperty("shop_id")) {
      whereClause.shop_id = data.shop_id;
    }

    if (data?.lang === "en") {
      attributes.push(["product_name_en", "product_name"]);
    } else if (data?.lang === "hi") {
      attributes.push(["product_name_hi", "product_name"]);
    } else if (data?.lang === "mr") {
      attributes.push(["product_name_mr", "product_name"]);
    }
    else{
        attributes=["id", "shop_id","price", "discount_price","product_name_en","product_name_hi","product_name_mr", "description", "category"];
    }

    return await DB.Product.findAndCountAll({
      where: whereClause,
      attributes, 
      include: [
        {
          model: DB.Shop,
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
        },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });
  } catch (error) {
    console.error("Error occurred in listCustomerProductDetail function : ", error);
    throw await createCustomErrorResponse(
      BAD_REQUEST_ERROR_CODE,
      "Unable to found shop list",
      error
    );
  }
};