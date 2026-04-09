import Joi from "joi";
export const listCustomerProductValidator = () => {

let validationSchema = Joi.object().keys({
    shop_id:Joi.string()
          .guid({ version: "uuidv4" })
          .messages({
            "string.guid": "shop_id must be a valid UUID v4",
          }),
    page: Joi.number().min(1).messages({
        "number.base": "Page  must be a valid number",
        "number.empty": "Page field can not be empty",
      }),
    size: Joi.number().min(1).messages({
        "number.base": "Size must be a valid number",
        "number.empty": "Size field can not be empty",
      }),
    lang: Joi.string()
    .valid("en", "hi", "mr")
    .messages({
        "any.only": "lang must be one of [en, hi, mr]",
        "string.empty": "lang is required",
    }),
  });
  return validationSchema;

};