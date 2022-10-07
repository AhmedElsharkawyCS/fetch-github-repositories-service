import { Request, Response } from "express"
import { HttpError } from "http-error-handling"
import { repositoryService } from "../services"
import { GetRepositoriesSearchQuery } from "../@types"
export class RepositoryController {
  static async getRepositories(req: Request, res: Response) {
    try {
      const { items } = await repositoryService.getRepositories(req.query as unknown as GetRepositoriesSearchQuery)
      if (items.length === 0) return HttpError.NotFound({ message: "No repositories found" })
      res.status(200).json(items)
    } catch (error) {
      console.log(error.response.data)
      HttpError.InternalServerError({ message: error.message })
    }
  }
}
