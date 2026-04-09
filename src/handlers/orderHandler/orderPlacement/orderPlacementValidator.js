import Joi from "joi";

export const orderPlaceValidator = () => {

  const schema = Joi.object({
  customer_name: Joi.string()
    .required()
    .messages({
      "string.empty": "customer_name is required",
    }),

   mobile_number: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .length(10)
        .required()
        .messages({
          "string.pattern.base":
            "Mobile number must be a valid 10-digit Indian number",
          "string.length": "Mobile number must be exactly 10 digits",
          "any.required": "mobile_number field is required",
          "string.empty": "mobile_number field cannot be empty",
        }),
    shop_id: Joi.string().required().guid({ version: "uuidv4" }).messages({
          "string.guid": " shop_id must be a valid GUID (UUID version 4)",
          "string.empty": " shop_id cannot be blank",
        }),
    product_id: Joi.string().required().guid({ version: "uuidv4" }).messages({
          "string.guid": " product_id must be a valid GUID (UUID version 4)",
          "string.empty": " product_id cannot be blank",
        }),
    quantity: Joi.number()
        .positive()
        .required()
        .messages({
          "string.empty": "quantity is required",
          "number.less":"quantity is always less than price"
        }),
  })
    

  return schema;
};