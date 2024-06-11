const path = require("path");

const express = require("express");
const defaultRouter = require("./routes/default");
const restaurantsRouter = require("./routes/restaurants");


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRouter);
app.use("/", restaurantsRouter);

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
