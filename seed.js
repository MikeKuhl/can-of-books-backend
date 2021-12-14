const mongoose = require('mongoose');
const Book = require('./models/bookModel.js')
require('dotenv').config()

async function seed() {

    mongoose.connect(process.env.DB_URL);
  
    const book = new Book({
      title: 'Harry Potter',
      description: 'Wizards n magic n stuff',
      status: true,
      email: 'beauhibbert789@gmail.com'
    });
  
  await book.save( function (err) {
    if (err) {
      console.error(err);
      } else {
        console.log('already read, Harry Potter')
      }
    });
    await Book.create({
      title: "Harry Potter: Philosopher's Stone (1997)",
      description: 'Wizards n magic n stuff',
      status: true,
      email: 'beauhibbert789@gmail.com'
    })
    
    await Book.create({
      title: "Chamber of Secrets (1998)",
      description: 'Wizards n magic n stuff',
      status: true,
      email: 'beauhibbert789@gmail.com'
    })
    await Book.create({
      title: "Prisoner of Azkaban (1999)",
      description: 'Wizards n magic n stuff',
      status: true,
      email: 'beauhibbert789@gmail.com'
    })

    mongoose.disconnect();
  }
  
  
  seed();

// await book.save( function (err) {
//   if (err) {
//     console.error(err);
//     } else {
//       console.log('already read, Harry Potter')
//     }
//   });



