import Joi from "joi";
import moment from "moment";

export const updateShopValidator = () => {
  const timeRegex = /^(0[1-9]|1[0-2]):([0-5]\d)(:([0-5]\d))?\s?(AM|PM)$/i;

  const schema = Joi.object({
    shop_name: Joi.string().trim().messages({
      "string.empty": "shop_name field cannot be empty",
    }),

    mobile_number: Joi.string()
      .trim()
      .pattern(/^[6-9]\d{9}$/)
      .length(10)
      .messages({
        "string.pattern.base":
          "Mobile number must be a valid 10-digit Indian number",
        "string.length": "Mobile number must be exactly 10 digits",
        "string.empty": "mobile_number field cannot be empty",
      }),

    category: Joi.string().trim().messages({
      "string.empty": "category field cannot be empty",
    }),

    address: Joi.string().trim().messages({
      "string.empty": "address field cannot be empty",
    }),

    city: Joi.string().trim().messages({
      "string.empty": "city field cannot be empty",
    }),

    opening_time: Joi.string()
      .pattern(timeRegex)
      .messages({
        "string.pattern.base":
          "opening_time must be in format HH:mm:ss AM/PM",
      }),

    closing_time: Joi.string()
      .pattern(timeRegex)
      .messages({
        "string.pattern.base":
          "closing_time must be in format HH:mm:ss AM/PM",
      }),

    password: Joi.string().trim().min(6).messages({
      "string.empty": "password cannot be empty",
      "string.min": "password must be at least 6 characters",
    }),
  })
  .custom((value, helpers) => {
  const { opening_time, closing_time } = value;

  // 👉 If both not provided → skip validation
  if (!opening_time && !closing_time) {
    return value;
  }

  // 👉 If only one is provided → throw error
  if (opening_time && !closing_time) {
    return helpers.message("closing_time is required when opening_time is provided");
  }

  if (!opening_time && closing_time) {
    return helpers.message("opening_time is required when closing_time is provided");
  }

  // 👉 Validate both
  const open = moment(opening_time, "hh:mm:ss A", true);
  const close = moment(closing_time, "hh:mm:ss A", true);

  if (!open.isValid() || !close.isValid()) {
    return helpers.message("Invalid time format");
  }

  // 👉 Strict same-day validation
  if (!close.isAfter(open)) {
    return helpers.message(
      "closing_time must be greater than opening_time (same day)"
    );
  }

  return value;
});

  return schema;
};