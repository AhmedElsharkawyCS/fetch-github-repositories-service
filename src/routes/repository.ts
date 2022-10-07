import { Router } from "express"
import { getRepositoriesSchema } from "../validation"
import { validator } from "../middleware"

const router = Router()

router.get("/repositories", validator(getRepositoriesSchema, "query"))

export { router as repositoryRoute }
