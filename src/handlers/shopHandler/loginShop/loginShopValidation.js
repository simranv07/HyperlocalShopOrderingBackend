import Joi from "joi";
export const loginShopValidator = () => {

  const schema = Joi.object({

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
    password: Joi.string().trim().required().messages({
            "any.required": "password is required",
            "string.empty": "password cannot be empty",
          }),

    
  })
    

  return schema;
};