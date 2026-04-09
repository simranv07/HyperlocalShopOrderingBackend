import jwt from "jsonwebtoken";
import { CONFIG } from "../constant/constant.js";
import {
  ERROR,
  INTERNAL_SERVER_ERROR,
  INVALID_TOKEN,
} from "../constant/responseConstant.js";
import {
  BAD_REQUEST_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} from "../constant/statusConstant.js";

//createResponse function is use to create the response object
export const createResponse = async (status, message_key, data = null) => {
  let responseData = {
    status: status,
    message_key: message_key,
  };
  if (data) {
    responseData.data = data;
  }
  return responseData;
};

//returnErrorResponse is use to return the error response object
export const returnErrorResponse = async (error, response) => {
  if (error?.isCustomError)
    return response
      .status(error.error_code)
      .json(await createResponse(error.status, error.message_key));
  return response
    .status(INTERNAL_SERVER_ERROR_CODE)
    .json(await createResponse(ERROR, INTERNAL_SERVER_ERROR));
};

//Creates a custom error response object with error code, message key, error details,
export const createCustomErrorResponse = async (
  error_code,
  message_key,
  error,
  status = "ERROR",
  isCustomError = true
) => {
  let customErrorObject = {
    error_code: error_code,
    message_key: message_key,
    status: status,
    isCustomError: isCustomError,
  };
  if (error) {
    customErrorObject.error = error;
  }
  return customErrorObject;
};

// verifyToken function is use to vertfy token
export const verifyToken = async (token) => {
  try {
    // console.log("token------" + token);
    token = token.split(" ")[1];
    return jwt.verify(token, CONFIG.JWT.SECRET);
  } catch (err) {
    console.error("Error occured while verifying token ", err);
    if (err == CONFIG.JWT.EXPIRE_TOKEN_ERROR) {
      return { err };
    }
    if (err == CONFIG.JWT.INVALID_TOKEN_ERROR) {
      return { err };
    }
    if (err == CONFIG.JWT.INVALID_SIGNATURE_ERROR) {
      return { err };
    }
    // throw await createCustomErrorResponse(
    //   BAD_REQUEST_ERROR_CODE,
    //   INVALID_TOKEN,
    //   err.message_key
    // );
  }
};

// Function to Get pagination parameters based on given page and size.
export const getPagination = async (page, size) => {
  const limit = size ? +size : CONFIG.DATA_LIMIT;
  const offset = page - 1 ? (page - 1) * limit : 0;
  console.log("000000", limit, offset);
  return { limit, offset };
};
/*============================================================= */
//Function Get paging data for a specific page from the provided data.
export const getPagingData = async (data, limit, page) => {
  const { count: total_items, rows: data_list } = data;
  const current_page = page ? +page : 1;
  const total_pages = Math.ceil(total_items / limit) || 0;
  const has_next = total_pages - current_page > 0 ? true : false;
  const has_preavious = current_page > 1 ? true : false;
  return {
    total_items,
    data_list,
    total_pages,
    current_page,
    has_next,
    has_preavious,
  };
};

export const generateToken = async (id, userType, authentication) => {
  try {
    let payload = {
      id: id,
      userType: userType,
      authentication: authentication,
    };
    return await jwt.sign(payload, CONFIG.JWT.SECRET, {
      expiresIn: CONFIG.JWT.EXPIRES_IN,
    });
  } catch (error) {
    console.error("Error occurred in generateToken function : ", error);
    return null;
  }
};

