import express, {Application} from 'express';

const PORT = 8080;

const app :Application = express();

app.listen(PORT, () => {
    console.log(`Server is listning to port: ${PORT}`)
})