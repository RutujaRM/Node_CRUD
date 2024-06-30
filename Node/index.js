const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const checkAPI_Key = require('./check_Api');  //here we call Check API key file 
const validateUser = require('./validation');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const db = require('./book_query');  // Call the query file 
const us = require('./users') ;      //Call the users file


/// Books rounting paths
app.get('/books', db.getBooks);
app.get('/book/:id', db.getBookById);
app.post('/add/books' , checkAPI_Key , db.addBook); 
app.put('/update/books/:id', checkAPI_Key,db.updateBook);
app.delete('/delete/books/:id', checkAPI_Key,db.deleteBook);


////// Users rounting paths
app.get('/users', us.getUsers);
app.get('/user/:id', us.getUserById);
app.post('/add/users' , validateUser,  us.addUser); 
app.put('/update/user/:id', validateUser ,us.updateUser); 
app.delete('/delete/user/:id', validateUser ,us.deleteUser);


 
app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
}
)

