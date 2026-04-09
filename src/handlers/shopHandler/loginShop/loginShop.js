
import { getShopDetail, insertShopDetail } from "../../../helpers/pgDBUtils/shopsUtils.js";
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, MOBILE_NUMBER_UNIQUE, SHOP_NOT_REGISTERED, INVALID_CREDENTIALS, LOGIN_SUCCESSFULLY} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, generateToken } from "../../../helpers/utils.js";
import { BAD_REQUEST_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { loginShopValidator } from "./loginShopValidation.js";
import bcrypt from "bcrypt";


/**
 * loginShop function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const loginShop = async (request, response) => {
  console.info("Execution start loginShop function : ", request);

  try {
    const { body } = request;
     await getConnection();
    const { error, value } = loginShopValidator().validate(body);
    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));


    const shopData = await getShopDetail({mobile_number:value.mobile_number});
    if (!shopData)
      return response
        .status(BAD_REQUEST_ERROR_CODE)
        .json(await createResponse(ERROR, SHOP_NOT_REGISTERED));

    const isMatch = await bcrypt.compare(value.password, shopData.password);
    if(!isMatch){
        return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR,INVALID_CREDENTIALS));
    }
    const accessToken = await generateToken(
      shopData.id,
      shopData.mobile_number,
      shopData.category
    );
    const finalData = {
        shop_id:shopData.id,
        shop_name : shopData.shop_name,
        mobile_number:value.mobile_number,
        category : shopData.category,
        access_token: accessToken,
    }
    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, LOGIN_SUCCESSFULLY,finalData));
  } catch (error) {
    console.error("Error occurred in loginShop function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
