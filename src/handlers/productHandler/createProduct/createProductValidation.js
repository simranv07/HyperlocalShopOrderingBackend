import Joi from "joi";

export const createProductValidator = () => {

  const schema = Joi.object({
    product_name_en:  Joi.string()
    .pattern(/^[A-Za-z0-9\s.,'-]+$/)
    .min(2)
    .max(100)
    .optional()
    .required()
    .messages({
       "any.required": "product_name_en field is required",
      "string.pattern.base": "product_name_en  must contain only English characters",
    }),
     product_name_hi: Joi.string()
    .pattern(/^[\u0900-\u097F]+$/) 
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.pattern.base": "Only Hindi characters allowed (e.g., पानी)",
      "string.empty": "Hindi product name is required",
    }),
     product_name_mr: Joi.string()
    .pattern(/^[\u0900-\u097F\s]+$/) 
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.pattern.base": "Only Marathi characters allowed (e.g., पाणी, भात)",
      "string.empty": "Marathi product name is required",
    }),

    price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be greater than 0",
    }),

  discount_price: Joi.number()
    .positive()
    .less(Joi.ref("price"))
    .required()
    .messages({
      "string.empty": "discount_price is required",
      "number.less":"discount_price is always less than price"
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      "string.empty": "description is required",
    }),

  category: Joi.string()
    .required()
    .messages({
      "string.empty": "Category is required",
    }),
  })
    

  return schema;
};