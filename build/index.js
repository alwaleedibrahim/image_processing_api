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
// Import express and and its type interfaces
const express_1 = __importDefault(require("express"));
// Import sharp for image manipulation
const sharp_1 = __importDefault(require("sharp"));
// Import fs for file handling
const fs_1 = require("fs");
// Set port
const PORT = 8080;
// Create express application
const app = (0, express_1.default)();
// Start server
app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`);
});
// Set the main route
app.get("/", (req, res) => {
    res
        .status(200)
        .send("Usage: /api?image={image_name}&height={height}&width={width}\n" +
        "Example: /api?image=santamonica&height=200&width=400");
});
// Set api route for resizing images
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield fs_1.promises.open(resizedImage, "r");
    }
    catch (Err) {
        // Throwing an error means that image doesn't exist
        try {
            // Use sharp to resize the image
            yield (0, sharp_1.default)(imageURL)
                .resize(imageHeight, imageWidth)
                .toFile(resizedImage);
        }
        catch (Err) {
            // Catch errors in resizing process
            res.status(500).send("Couldn't resize image");
        }
    }
    finally {
        // Send resized image with status: 200_OK
        res.status(200).sendFile(resizedImage, { root: "." });
    }
}));
exports.default = app;
