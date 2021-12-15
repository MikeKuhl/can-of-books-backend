"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Book = require("./models/bookModel");
const app = express();
const mongoose = require("mongoose");

app.get("/test", (request, response) => {
  response.send("test request received");
});

app.use(cors());
app.use(express.json());

app.get("/test", (request, response) => {
  response.send("test request received");
});

app.get("/books", handleGetBooks);
app.post("/books:id", handlePostBooks);
app.delete("/books:id", handleDeleteBooks);
app.put("/books/:id", handlePutBooks);

async function handleGetBooks(req, res) {
  const bookSearch = {};

  if (req.query.email) {
    searchObject.email = req.query.email;
  }
  try {
    const booksDB = await Book.find(bookSearch);
    if (booksDB.length > 0) {
      res.status(200).send(booksDB);
    } else {
      res.status(404).send("error books not found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Bookshelf Error");
  }
}

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URL);

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});

async function handlePostBooks(req, res) {
  // console.log(req.body);
  const { email } = req.query;
  const { title, description, status } = req.body;
  try {
    const newBook = await Book.create({ ...req.body, email });
    res.status(204).send(newBook);
  } catch (e) {
    res.status(500).send("Bookshelf error");
  }
}

async function handleDeleteBooks(req, res) {
  //matching the books IDs and Emails before delete
  const { id } = req.params;
  const { email } = req.query;
  try {
    const book = await Book.findOne({ _id: id, email });
    if (!book) res.status(400).send("Could not delete book");
    else {
      await Book.findByIdAndDelete(id);
      res.status(204).send("delete success");
    }
  } catch (e) {
    res.status(500).send("server error");
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
