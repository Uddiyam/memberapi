const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const memberRouter = require("./routes/api/member");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/member", memberRouter);

app.use(express.static(path.join(__dirname, "memberapi_react/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/memberapi_react/build/index.html"));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
