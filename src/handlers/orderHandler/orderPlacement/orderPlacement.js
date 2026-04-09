
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, PRODUCT_NOT_FOUND, ORDER_PLACED_SUCCESSFULLY} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse } from "../../../helpers/utils.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { getProductDetail } from "../../../helpers/pgDBUtils/productUtils.js";
import { orderPlaceValidator } from "./orderPlacementValidator.js";
import { placeOrderDetail } from "../../../helpers/pgDBUtils/orderUtils.js";

/**
 * createProductFunction function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const placeOrderFunction = async (request, response) => {
  console.info("Execution start placeOrderFunction function : ", request);

  try {
    const { body } = request;
     await getConnection();

    const { error, value } = orderPlaceValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));
    const productData = await getProductDetail({id:value?.product_id,shop_id:value?.shop_id})
    if(!productData){
         return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, PRODUCT_NOT_FOUND));
    }
    const total = productData?.price * value?.quantity;
    const commission = total * 0.05;
    const finalAmount = total - commission;
    value.total_price = total;
    value.commission = commission;
    value.final_amount = finalAmount; 
    const orderData = await placeOrderDetail(value);

    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, ORDER_PLACED_SUCCESSFULLY,orderData));
  } catch (error) {
    console.error("Error occurred in placeOrderFunction function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
