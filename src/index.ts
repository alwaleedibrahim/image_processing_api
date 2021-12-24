import express, {Application, Request, Response} from 'express';

const PORT :Number = 8080;

const app :Application = express();

app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`)
});

app.get("/", (req :Request, res :Response) => {
    res.send("Please upload an image!");
});

app.get("/image", (req :Request, res :Response) => {
    const imageId = req.query.image;
    const imageHeight = req.query.height;
    const imageWidth = req.query.width;
    res.send("" + imageId + imageHeight + imageWidth);
});