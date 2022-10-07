import "express-async-errors"
import express, { json, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
// NOTE: this npm library developed by me
import { HttpError } from "http-error-handling"
import { repositoryRoutes } from "./routes"

const app = express()
const prefix = "/api"

app.use(HttpError.initializer)
app.use(morgan("common"))
app.use(cors())
app.set("trust proxy", 1)
app.use(json())

app.get(prefix, (req: Request, res: Response) => res.send(200).send("service works fine."))

// health check api
app.get(prefix + "/status", (req: Request, res: Response) => res.status(200).send("ok"))

app.use(prefix, [repositoryRoutes])
app.all("*", () => HttpError.NotFound({ message: "route not found" }))

app.use(HttpError.handler)

export { app }
