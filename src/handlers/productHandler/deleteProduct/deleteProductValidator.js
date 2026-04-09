import Joi from "joi";

export const deleteProductValidator = () => {

  const schema = Joi.object({
   id: Joi.array()
  .items(
    Joi.string()
      .guid({ version: "uuidv4" })
      .messages({
        "string.guid": "Each id must be a valid UUID v4",
      })
  )
  .min(1)
  .required()
  .messages({
    "array.base": "id must be an array",
    "array.min": "At least one id is required",
  }),
  })

  return schema;
};