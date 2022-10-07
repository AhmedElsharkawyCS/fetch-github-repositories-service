import Joi from "joi"
import { GetRepositoriesSearchQuery } from "../@types"

const currentDate = new Date().toISOString().split("T")[0]
export const getRepositoriesSchema = Joi.object<GetRepositoriesSearchQuery>({
  fromDate: Joi.date()
    .max(`${currentDate}`)
    .iso()
    .required()
    .messages({
      "date.format": `fromDate format is YYYY-MM-DD`,
      "date.max": `from date must be less than ${currentDate}`,
      "any.required": `fromDate is required`
    }),
  pageSize: Joi.number().min(10).max(100).required().messages({
    "number.format": "pageSize must be a number",
    "number.min": `Page size must be greater than or equal 10`,
    "number.max": `Page size must be less than or equal 100`,
    "any.required": "pageSize is required"
  }),
  programmingLanguage: Joi.string()
    .min(2)
    .messages({
      "string.min": `Programming language must be greater than or equal 2 characters`
    })
    .optional()
})
