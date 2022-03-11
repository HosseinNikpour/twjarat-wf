const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const path = require("path");

require("dotenv").config();

const app = express();

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const REST_API_ROOT = "/api";
app.use(REST_API_ROOT, require("./routes/router"));


app.use(express.static(path.join(__dirname, "/Docs")));

const port = 7100;
app.listen(port);

console.log("App is listening on port " + port);
