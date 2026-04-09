import Joi from "joi";
export const listProductValidator = () => {

let validationSchema = Joi.object().keys({
    page: Joi.number().min(1).messages({
        "number.base": "Page  must be a valid number",
        "number.empty": "Page field can not be empty",
      }),
    size: Joi.number().min(1).messages({
        "number.base": "Size must be a valid number",
        "number.empty": "Size field can not be empty",
      }),
  });
  return validationSchema;

};