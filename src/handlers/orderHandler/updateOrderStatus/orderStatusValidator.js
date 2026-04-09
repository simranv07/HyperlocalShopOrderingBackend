import Joi from "joi";

export const updateOrderStatusValidator = () => {

  const schema = Joi.object({
    id: Joi.string().required().guid({ version: "uuidv4" }).messages({
      "string.guid": " id must be a valid GUID (UUID version 4)",
      "string.empty": " id cannot be blank",
    }),
     status: Joi.string()
            .valid("pending", "accepted", "rejected", "completed")
            .messages({
            "string.base": "Status must be a valid string",
            "any.only": "Status must be one of [pending, accepted, rejected, completed]",
            "string.empty": "Status cannot be empty",
     }),
   
})

  return schema;
};