
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, PRODUCT_CREATED_SUCCESSFULLY, PRODUCT_NOT_FOUND, DISCOUNT_PRICE_VALIDATOR, PRICE_VALIDATOR, PRODUCT_UPDATED_SUCCESSFYLLY, TOKEN_MISSING} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, verifyToken } from "../../../helpers/utils.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { getProductDetail, updateProductDetail } from "../../../helpers/pgDBUtils/productUtils.js";
import { updateProductValidator } from "./updateProductValidator.js";

/**
 * cupdateProductFunction function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const updateProductFunction = async (request, response) => {
  console.info("Execution start updateProductFunction function : ", request);

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

    const { error, value } = updateProductValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));

    const projectData = await getProductDetail({id:value.id,shop_id:tokenData.id});
    if(!projectData){
       return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR,PRODUCT_NOT_FOUND )); 
    }
    console.log("----------------",projectData)
    if(value.hasOwnProperty("discount_price")&& !value.hasOwnProperty("price")){
        if(value.discount_price>=projectData?.dataValues?.price){
            return response
            .status(VALIDATION_ERROR_CODE)
            .json(await createResponse(ERROR,DISCOUNT_PRICE_VALIDATOR ));
        }
    }
    if(value.hasOwnProperty("price")&& !value.hasOwnProperty("discount_price")){
       if(value.price<=projectData?.dataValues?.discount_price){
            return response
            .status(VALIDATION_ERROR_CODE)
            .json(await createResponse(ERROR,PRICE_VALIDATOR ));
        }
    }
    if(value.hasOwnProperty("price")&&value.hasOwnProperty("discount_price")){
        if(value.price<=value.discount_price){
             return response
            .status(VALIDATION_ERROR_CODE)
            .json(await createResponse(ERROR,PRICE_VALIDATOR ));
        }
    }
    await updateProductDetail(value);

    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, PRODUCT_UPDATED_SUCCESSFYLLY));
  } catch (error) {
    console.error("Error occurred in createProductFunction function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
