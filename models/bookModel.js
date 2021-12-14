const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  description: String,
  status: Boolean,
  email: String,
})


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;