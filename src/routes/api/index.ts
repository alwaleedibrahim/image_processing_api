import express, {Router, Request, Response, response} from "express";

import resizeImage from "../../models/image_resizer"
const api: Router = express.Router();

api.get("/", async (req: Request, res: Response) => {
 
// Extract resizing information from GET request
 const imageName = `${req.query.image}`;
 const imageHeight = Number(req.query.height);
 const imageWidth = Number(req.query.width);

 const resized =  await resizeImage(imageName, imageHeight, imageWidth);

 if (resized !== "Error") {
    res.status(200).sendFile(resized, { root: "." }); 
}
 else {
    res.status(500).send("Couldn't resize image");
 }

});

export default api;