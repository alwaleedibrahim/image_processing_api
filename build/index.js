"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 8080;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Please upload an image!");
});
app.get("/image", (req, res) => {
    const imageId = req.query.image;
    const imageHeight = req.query.height;
    const imageWidth = req.query.width;
    res.send("" + imageId + imageHeight + imageWidth);
});
