"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const PORT = 8080;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`);
});
app.get("/", (req, res) => {
    res.status(200)
        .send("Usage: /api?image={image_name}&height={height}&width={width}");
});
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = `${req.query.image}`;
    const imageURL = `assets/images/${imageName}.jpg`;
    const imageHeight = Number(req.query.height);
    const imageWidth = Number(req.query.width);
    const resizedImage = `assets/resized/${imageName}_${imageHeight}_${imageWidth}.jpg`;
    // Resize the image only if it wasn't resized previously
    try {
        yield fs_1.promises.open(resizedImage, "r");
    }
    catch (Err) {
        try {
            yield (0, sharp_1.default)(imageURL)
                .resize(imageHeight, imageWidth)
                .toFile(resizedImage);
        }
        catch (Err) {
            res.status(404)
                .send("Couldn't resize image");
        }
    }
    finally {
        res.status(200)
            .sendFile(resizedImage, { root: "." });
    }
}));
