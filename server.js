const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/upload", upload.single("questions"), (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.file.filename);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file.");
    }
    const questions = JSON.parse(data);
    res.json(questions);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
