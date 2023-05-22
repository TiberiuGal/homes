const express = require("express");
const { getPage, savePage } = require("./db/store");
const bodyParser = require('body-parser');
const path = require('node:path'); 
const PORT = process.env.PORT || 3001;

const app = express();
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(bodyParser.json());

app.get("/wiki/:id", (req, res) => {
  getPage(req.params.id).then((page) => {
    res.json(page);
  });
});

app.post("/wiki", (req, res) => {
  req.body
  savePage(req.body).then((page) => {
    res.status(201).json({ message: "Page created" });
  });
});

app.get("*", (req, res) => {

  res.sendFile(
    path.resolve(__dirname, "../react-frontend/build", req.url.substring(1))
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
