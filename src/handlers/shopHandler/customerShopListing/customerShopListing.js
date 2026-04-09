
import { listShopDetail } from "../../../helpers/pgDBUtils/shopsUtils.js";
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, SHOP_LISTED_SUCCESS} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, getPagination, getPagingData } from "../../../helpers/utils.js";
import {  INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import { listShopValidator } from "./customerShopListingValidator.js";

/**
 * listCustomerShopDetail function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey .
 */
export const listCustomerShopDetail = async (request, response) => {
  console.info("Execution start listCustomerShopDetail function : ", request);

  try {
    const { query } = request;
     await getConnection();
    const { error, value } = listShopValidator().validate(query);

    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));

    const { limit, offset } = await getPagination(value?.page, value?.size);

    let shopData = await listShopDetail(limit,offset,value);

    shopData = await getPagingData(shopData, limit, value?.page);

    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, SHOP_LISTED_SUCCESS,shopData));
  } catch (error) {
    console.error("Error occurred in listCustomerShopDetail function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
