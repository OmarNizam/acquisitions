import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from Acquistions api!");
});

export default app;
