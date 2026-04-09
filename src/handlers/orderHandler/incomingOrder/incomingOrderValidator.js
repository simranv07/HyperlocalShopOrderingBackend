import Joi from "joi";
import moment from "moment";

export const orderManagementValidator = () => {

  const schema = Joi.object({
        status: Joi.string()
          .valid("pending", "accepted", "rejected", "completed")
          .messages({
            "string.base": "Status must be a valid string",
            "any.only": "Status must be one of [pending, accepted, rejected, completed]",
            "string.empty": "Status cannot be empty",
          }),
        page: Joi.number().min(1).messages({
            "number.base": "Page  must be a valid number",
            "number.empty": "Page field can not be empty",
          }),
        size: Joi.number().min(1).messages({
            "number.base": "Size must be a valid number",
            "number.empty": "Size field can not be empty",
          }),
  })
  return schema;
};