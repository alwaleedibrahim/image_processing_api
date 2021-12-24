import express, {Application, Request, Response} from 'express';

import sharp from "sharp";

import {promises as fsPromises, PathLike} from "fs";


const PORT :Number = 8080;

const app :Application = express();

app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`)
});

app.get("/", (req :Request, res :Response) => {
    res.status(200)
    .send("Usage: /api?image={image_name}&height={height}&width={width}\n" +
    "Example: /api?image=santamonica&height=200&width=400");
});

app.get("/api", async (req :Request, res :Response) => {

    const imageName :string = `${req.query.image}`;
    const imageURL :string = `assets/images/${imageName}.jpg`;
    const imageHeight :number = Number(req.query.height); 
    const imageWidth :number = Number(req.query.width);
    const resizedImage :string = `assets/resized/${imageName}_${imageHeight}_${imageWidth}.jpg`;
    
    // Resize the image only if it wasn't resized previously
    try {
        await fsPromises.open(resizedImage, "r");
    }
    catch (Err) {
        try {
            await sharp(imageURL)
            .resize(imageHeight, imageWidth)
            .toFile(resizedImage);
        }
        catch (Err) {
            res.status(404)
            .send("Couldn't resize image")
        }
    }
    finally {
        res.status(200)
        .sendFile(resizedImage, {root: "."});
    }
});
