import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (_request: Request, response: Response) => {
  response.send("");
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
