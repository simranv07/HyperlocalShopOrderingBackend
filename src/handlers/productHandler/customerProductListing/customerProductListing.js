
import { ERROR,SUCCESS,INTERNAL_SERVER_ERROR, PRODUCT_LISTED_SUCCESSFULLY, TOKEN_MISSING} from "../../../constant/responseConstant.js";
import { closeConnection, getConnection } from "../../../helpers/dbConnection.js";
import { createResponse, getPagination, getPagingData } from "../../../helpers/utils.js";
import { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, VALIDATION_ERROR_CODE } from "../../../constant/statusConstant.js";
import {  listCustomerProductDetail } from "../../../helpers/pgDBUtils/productUtils.js";
import { listCustomerProductValidator } from "./customerProductValidation.js";

/**
 * listCustomerProductFunction function is use to create the band
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @returns - return response object with statusCode ,messageKey.
 */
export const listCustomerProductFunction = async (request, response) => {
  console.info("Execution start listCustomerProductFunction function : ", request);

  try {
    const { query } = request;
    await getConnection();

    const { error, value } = listCustomerProductValidator().validate(query);

    if (error)
      return response
        .status(VALIDATION_ERROR_CODE)
        .json(await createResponse(ERROR, error.details[0].message));
  
    const { limit, offset } = await getPagination(value?.page, value?.size);

    let productData = await listCustomerProductDetail(limit,offset,value);

    productData = await getPagingData(productData, limit, value?.page);

    return response
      .status(SUCCESS_CODE)
      .json(await createResponse(SUCCESS, PRODUCT_LISTED_SUCCESSFULLY,productData));
  } catch (error) {
    console.error("Error occurred in listCustomerProductFunction function : ", error);
    return response
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
  } finally {
    await closeConnection();
  }
};
