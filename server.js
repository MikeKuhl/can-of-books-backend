'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/bookModel')
const app = express();
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json())

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', handleGetBooks)
app.post('/books:id',handlePostBooks)

async function handleGetBooks(req,res) {
  try {
    const booksDB =  await Book.find({});
    if (booksDB) {
      res.status(200).send(booksDB)
    } else {
      res.status(404).send('No books!')
    }
  } catch (e) {
    res.status(500).send('Server Error!')
  }
}

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL);

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

async function handlePostBooks(req, res) {
  // console.log(req.body);
  try {
    const bookMaker = await Book.create(req.body);
    res.status(204).send(bookMaker);
  }catch (e){
    res.status(500).send('Bookshelf error')
  }
  
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
