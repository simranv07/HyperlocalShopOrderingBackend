
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, PRODUCT_NOT_FOUND, DISCOUNT_PRICE_VALIDATOR, PRICE_VALIDATOR, PRODUCT_UPDATED_SUCCESSFYLLY, TOKEN_MISSING, ORDER_NOT_FOUND} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, verifyToken } from "../../../helpers/utils.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { getProductDetail, updateProductDetail } from "../../../helpers/pgDBUtils/productUtils.js";
import { updateOrderStatusValidator } from "./orderStatusValidator.js";
import { getOrderDetail, updateOrderDetail } from "../../../helpers/pgDBUtils/orderUtils.js";

/**
 * updateOrderStatueFunction function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const updateOrderStatueFunction = async (request, response) => {
  console.info("Execution start updateOrderStatueFunction function : ", request);

  try {
    const { body,headers } = request;
     await getConnection();
     if(!headers?.authorization){            
        return response
           .status(VALIDATION_ERROR_CODE)
           .json(await createResponse(ERROR, TOKEN_MISSING));
      }
    const tokenData = await verifyToken(headers?.authorization);
    if(tokenData?.err){
         return response
           .status(VALIDATION_ERROR_CODE)
           .json(await createResponse(ERROR,tokenData.err));
        }  

    const { error, value } = updateOrderStatusValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));

    const orderData = await getOrderDetail({id:value.id,shop_id:tokenData.id});
    if(!orderData){
       return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR,ORDER_NOT_FOUND )); 
    }
    
   
    await updateOrderDetail(value);

    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, PRODUCT_UPDATED_SUCCESSFYLLY));
  } catch (error) {
    console.error("Error occurred in updateOrderStatueFunction function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
