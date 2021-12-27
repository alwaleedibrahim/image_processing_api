import express, {Router, Request, Response, response} from "express";

const api = express.Router();

api.get("/", (req: Request, res: Response) => {
    res.send("api");
});

export default api;