import express, {Application, Request, Response} from 'express';

import sharp from "sharp";

const PORT :Number = 8080;

const app :Application = express();

app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`)
});

app.get("/", (req :Request, res :Response) => {
    res.send("Please upload an image!");
});

app.get("/image", (req :Request, res :Response) => {
    const imageName = req.query.image;
    const imageURL = `assets/images/${imageName}.jpg`;
    const imageHeight = Number(req.query.height); 
    const imageWidth = Number(req.query.width);
    const resizedImage = `assets/resized/${imageName}_${imageHeight}_${imageWidth}.jpg`;
    sharp(imageURL)
    .resize(imageHeight, imageWidth)
    .toFile(resizedImage);
    res.sendFile(resizedImage, {root: "."});
});