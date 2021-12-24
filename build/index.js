"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const PORT = 8080;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Please upload an image!");
});
app.get("/image", (req, res) => {
    const imageName = req.query.image;
    const imageURL = `assets/images/${imageName}.jpg`;
    const imageHeight = Number(req.query.height);
    const imageWidth = Number(req.query.width);
    const resizedImage = `assets/resized/${imageName}_${imageHeight}_${imageWidth}.jpg`;
    (0, sharp_1.default)(imageURL)
        .resize(imageHeight, imageWidth)
        .toFile(resizedImage);
    res.sendFile(resizedImage, { root: "." });
});
