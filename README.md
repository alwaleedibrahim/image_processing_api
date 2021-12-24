# Image Processing API

An API for resizing images

## Setup

0. Clone/download project

1. Install node

2. Install dependancies
```
npm install
```
3. Build 
```
npm build
```
4. Start sever
```
npm start
```
5. Navigate to http://localhost:8080/

## How to use

Use the following format to specify height and width of the output image:
http://localhost:8080/api?image={image_name}&height={height}&width={width}

http://localhost:8080/api?image=santamonica&height=200&width=400"