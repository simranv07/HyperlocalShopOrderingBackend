
import {  ERROR,SUCCESS,INTERNAL_SERVER_ERROR, ORDER_LISTED_SUCCESSFULLY, TOKEN_MISSING} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, getPagination, getPagingData, verifyToken } from "../../../helpers/utils.js";
import {  INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { orderManagementValidator } from "./incomingOrderValidator.js";
import { listOrderDetail } from "../../../helpers/pgDBUtils/orderUtils.js";

/**
 * incomingOrder function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const incomingOrder = async (request, response) => {
  console.info("Execution start incomingOrder function : ", request);

  try {
    const { query ,headers} = request;
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
    const { error, value } = orderManagementValidator().validate(query);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));
    value.shop_id = tokenData?.id;
    const { limit, offset } = await getPagination(value?.page, value?.size);
    
    let shopData = await listOrderDetail(limit,offset,value);
    
    shopData = await getPagingData(shopData, limit, value?.page);
    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, ORDER_LISTED_SUCCESSFULLY,shopData));
  } catch (error) {
    console.error("Error occurred in incomingOrder function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
