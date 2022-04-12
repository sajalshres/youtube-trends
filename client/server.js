const express = require("express");
const path = require("path");
const app = express();

const port = 9000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
