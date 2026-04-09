import Joi from "joi";
import moment from "moment";

export const registerShopValidator = () => {
  const timeRegex = /^(0[1-9]|1[0-2]):([0-5]\d)(:([0-5]\d))?\s?(AM|PM)$/i;

  const schema = Joi.object({
    shop_name: Joi.string().trim().required().messages({
      "any.required": "shop_name field is required",
      "string.empty": "shop_name field cannot be empty",
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

    category: Joi.string().trim().required().messages({
      "any.required": "category field is required",
      "string.empty": "category field cannot be empty",
    }),

    address: Joi.string().trim().required().messages({
      "any.required": "address field is required",
      "string.empty": "address field cannot be empty",
    }),

    city: Joi.string().trim().required().messages({
      "any.required": "city field is required",
      "string.empty": "city field cannot be empty",
    }),

    opening_time: Joi.string()
      .pattern(timeRegex)
      .required()
      .messages({
        "string.pattern.base":
          "opening_time must be in format HH:mm:ss AM/PM",
        "any.required": "opening_time is required",
      }),

    closing_time: Joi.string()
      .pattern(timeRegex)
      .required()
      .messages({
        "string.pattern.base":
          "closing_time must be in format HH:mm:ss AM/PM",
        "any.required": "closing_time is required",
      }),

    password: Joi.string().trim().min(6).required().messages({
      "any.required": "password is required",
      "string.empty": "password cannot be empty",
      "string.min": "password must be at least 6 characters",
    }),
  })
    .custom((value, helpers) => {
    const open = moment(value.opening_time, "hh:mm:ss A", true);
    const close = moment(value.closing_time, "hh:mm:ss A", true);

    if (!open.isValid() || !close.isValid()) {
        return helpers.message("Invalid time format");
    }

    if (!close.isAfter(open)) {
        return helpers.message(
        "closing_time must be greater than opening_time (same day)"
        );
    }

    return value;
    });

  return schema;
};