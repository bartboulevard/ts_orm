import mongoose from "mongoose"
import express, { Express, Request, Response } from "express";
import articleController from "./controllers/articleController";
import commentController from "./controllers/commentController";
import authorController from "./controllers/authorController";

mongoose.connect("mongodb+srv://kasparpedaja:xUPGzzR8dd8ovibo@cluster0.eqhmnxq.mongodb.net/test")
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/', articleController);
app.use('/', commentController);
app.use('/', authorController);

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});

