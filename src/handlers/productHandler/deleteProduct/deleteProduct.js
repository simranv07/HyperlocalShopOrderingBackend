
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, PRODUCT_NOT_FOUND, PRODUCT_DELETED_SUCCESSFULLY, TOKEN_MISSING} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, verifyToken } from "../../../helpers/utils.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { deleteProductDetail, getMultipleProductDetail, getProductDetail, updateProductDetail } from "../../../helpers/pgDBUtils/productUtils.js";
import { deleteProductValidator } from "./deleteProductValidator.js";

/**
 * deleteProductFunction function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const deleteProductFunction = async (request, response) => {
  console.info("Execution start deleteProductFunction function : ", request);

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

    const { error, value } = deleteProductValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));

    const projectData = await getMultipleProductDetail({id:value.id,shop_id:tokenData.id});
    if(projectData.length>0){
       return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR,projectData + " "+PRODUCT_NOT_FOUND )); 
    }
    
    await deleteProductDetail(value);

    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, PRODUCT_DELETED_SUCCESSFULLY));
  } catch (error) {
    console.error("Error occurred in deleteProductFunction function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
