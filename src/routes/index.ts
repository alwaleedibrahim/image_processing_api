import express, {Router, Request, Response} from "express";
import api from "./api/index";
const routes: Router = express.Router();

routes.get("/", (req: Request, res: Response) => {
    res.send("Router !")
});

routes.use("/api", api);

export default routes;