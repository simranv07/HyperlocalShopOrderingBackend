
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, PRODUCT_CREATED_SUCCESSFULLY, TOKEN_MISSING} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, verifyToken } from "../../../helpers/utils.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { createProductValidator } from "./createProductValidation.js";
import { insertProduceDetail } from "../../../helpers/pgDBUtils/productUtils.js";

/**
 * createProductFunction function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const createProductFunction = async (request, response) => {
  console.info("Execution start createProductFunction function : ", request);

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

    const { error, value } = createProductValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));
    value.shop_id = tokenData.id;
    await insertProduceDetail(value);

    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, PRODUCT_CREATED_SUCCESSFULLY));
  } catch (error) {
    console.error("Error occurred in createProductFunction function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
