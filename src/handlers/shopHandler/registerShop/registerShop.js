
import { registerShopValidator } from "./registerShopValidation.js";
import { getShopDetail, insertShopDetail } from "../../../helpers/pgDBUtils/shopsUtils.js";
import { SHOP_REGISTERED_UCCESSFULLY ,ERROR,SUCCESS,INTERNAL_SERVER_ERROR, MOBILE_NUMBER_UNIQUE} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse } from "../../../helpers/utils.js";
import { BAD_REQUEST_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import bcrypt from "bcrypt";

/**
 * registerShop function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const registerShop = async (request, response) => {
  console.info("Execution start registerShop function : ", request);

  try {
    const { body } = request;
     await getConnection();
    const { error, value } = registerShopValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));

    const shopData = await getShopDetail({mobile_number:value.mobile_number});
    if (shopData)
      return response
        .status(BAD_REQUEST_ERROR_CODE)
        .json(await createResponse(ERROR, MOBILE_NUMBER_UNIQUE));

    value.password = await bcrypt.hash(value.password, 10);
    
    await insertShopDetail(value);
    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, SHOP_REGISTERED_UCCESSFULLY));
  } catch (error) {
    console.error("Error occurred in registerShop function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
