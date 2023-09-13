import Joi from "joi";

const inputDateSchema = Joi.object({
  startDate: Joi.date().required().messages({
    "date.base": "Start Date is required.",
    "any.required": "Start Date is invalid.",
  }),
  endDate: Joi.date().required().messages({
    "date.base": "End Date is required.",
    "any.required": "End Date is invalid.",
  }),
});

export default (input) => {
  const { error } = inputDateSchema.validate(input, { abortEarly: false });
  if (error) {
    return error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
  }
};
