import express, {Router, Request, Response, response} from "express";

// Import sharp for image manipulation
import sharp from "sharp";

// Import fs for file handling
import { promises as fsPromises } from "fs";

const api: Router = express.Router();

api.get("/", async (req: Request, res: Response) => {
 
// Extract resizing information from GET request
 const imageName = `${req.query.image}`;
 const imageURL = `assets/images/${imageName}.jpg`;
 const imageHeight = Number(req.query.height);
 const imageWidth = Number(req.query.width);

 // Set the path where the resized image will be stored (or where it is stored already)
 const resizedImage = `assets/resized/${imageName}_${imageHeight}_${imageWidth}.jpg`;

 // Try to access the resized image
 // (in case it was resized previously)
 try {
   await fsPromises.open(resizedImage, "r");
 } catch (Err) {
   // Throwing an error means that image doesn't exist
   try {
     // Use sharp to resize the image
     await sharp(imageURL)
       .resize(imageHeight, imageWidth)
       .toFile(resizedImage);
   } catch (Err) {
     // Catch errors in resizing process
     res.status(500).send("Couldn't resize image");
   }
 } finally {
   // Send resized image with status: 200_OK
   res.status(200).sendFile(resizedImage, { root: "." });
 }
});

export default api;