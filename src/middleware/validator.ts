import { Request, Response, NextFunction } from "express"
import { Schema } from "joi"
import { HttpError } from "http-error-handling"

/**
 * @description validate request body, query, params
 * @param schema
 * @param source - body, query, params
 * @returns {function(*=, *=, *=): Promise<void>}
 * @example router.get("/repositories", validator(getRepositoriesSchema, "query"))
 */
export const validator = (schema: Schema, source: "body" | "params" | "query" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source])
    if (error) {
      return HttpError.BadRequest({ message: error.message })
    }
    next()
  }
}
