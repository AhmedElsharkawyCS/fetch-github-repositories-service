import { Router } from "express"
import { getRepositoriesSchema } from "../validation"
import { validator } from "../middleware"
import { RepositoryController } from "../controllers"

const router = Router()

router.get("/repositories", validator(getRepositoriesSchema, "query"), RepositoryController.getRepositories)

export { router as repositoryRoutes }
