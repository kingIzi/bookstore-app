//Imports
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

const uri =
  "mongodb+srv://IziKapampa:test123@cluster0.sdxmb.mongodb.net/syllabuses?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  () => {
    app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
  },
  (e) => console.error("Connection Failed")
);

//Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

//Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const homeRoute = require("./routes/index");
app.use("/", homeRoute);

const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

const favoritesRoute = require("./routes/favorites");
app.use("/favorites", favoritesRoute);

const viewingRoute = require("./routes/viewing");
app.use("/viewing", viewingRoute);
