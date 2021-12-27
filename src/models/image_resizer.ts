// Import sharp for image manipulation
import sharp from "sharp";

// Import fs for file handling
import { promises as fsPromises } from "fs";

const resizeImage = async function(imageName: string, imageHeight: number, imageWidth: number) {
 // Set the path where the resized image will be stored (or where it is stored already)
 const imageURL = `assets/images/${imageName}.jpg`;

 const resizedImagePath = `assets/resized/${imageName}_${imageHeight}_${imageWidth}.jpg`;

 // Try to access the resized image
 // (in case it was resized previously)
 try {
   await fsPromises.open(resizedImagePath, "r");
 } catch (Err) {
   // Throwing an error means that image doesn't exist
   try {
     // Use sharp to resize the image
     await sharp(imageURL)
       .resize(imageHeight, imageWidth)
       .toFile(resizedImagePath);
   } catch (Err) {
     // Catch errors in resizing process
     return "Error";
   }
 } finally {
   // Send resized image with status: 200_OK
   return resizedImagePath;
 }
}

export default resizeImage;