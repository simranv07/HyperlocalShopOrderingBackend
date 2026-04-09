
import { getShopDetail, updateShopDetail } from "../../../helpers/pgDBUtils/shopsUtils.js";
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, PROFILE_UPDATED_SUCCESS, TOKEN_MISSING, MOBILE_NUMBER_UNIQUE} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, verifyToken } from "../../../helpers/utils.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import bcrypt from "bcrypt";
import { updateShopValidator } from "./updateProfileValidation.js";

/**
 * updateShopProfile function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const updateShopProfile = async (request, response) => {
  console.info("Execution start updateShopProfile function : ", request);

  try {
    const { body ,headers} = request;
     await getConnection();

     if(!headers?.authorization){
        return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, TOKEN_MISSING));
     }
    const { error, value } = updateShopValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));
    const tokenData = await verifyToken(headers?.authorization);
    if(tokenData?.err){
         return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR,tokenData.err));
    }

    if(value.hasOwnProperty("password")){
       value.password = await bcrypt.hash(value.password, 10);
    }
    if(value.hasOwnProperty("mobile_number")){
        const mobileNumberData = await getShopDetail({mobile_number:value.mobile_number});
            if(mobileNumberData && tokenData.id!=mobileNumberData.id){
                return response
                    .status(VALIDATION_ERROR_CODE)
                    .json(await createResponse(ERROR,MOBILE_NUMBER_UNIQUE));
        }
    }
    value.id = tokenData.id;
    await updateShopDetail(value);
    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, PROFILE_UPDATED_SUCCESS));
  } catch (error) {
    console.error("Error occurred in updateShopProfile function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
