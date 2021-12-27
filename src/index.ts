import express, { Application, Request, Response } from "express"
import routes from "./routes/index";
import morgan from "morgan"
import * as dotenv from "dotenv"
dotenv.config()

const PORT: string | 3000 = process.env.PORT || 3000

const app: Application = express()

app.use(morgan("dev"));

app.use("/", routes);
app.listen(PORT, (): void => {
  console.log(`Server is listening to port:${PORT}`)
})

export default app;