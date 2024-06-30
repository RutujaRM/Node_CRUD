const { Pool } = require('pg');
const pool = require('./db');  //database connection imported



// 1) Read get all books data

const getBooks = (request, response) => {
  pool.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


// 2) get / Read book with that particular id 

const getBookById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};



// 3) POST / Create books data 

const addBook = (request, response) => {
   
  const { title, author, published_date, isbn, genre, pages, publisher, language } = request.body;

  pool.query(
    'INSERT INTO books (title, author, published_date, isbn, genre, pages, publisher, language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [title, author, published_date, isbn, genre, pages, publisher, language],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows[0]);
    }
  );
};


// 4) UPDATE / particular id data

const updateBook = (request, response ) => {
  const id = parseInt(request.params.id);
  const { title, author, published_date, isbn, genre, pages, publisher, language } = request.body;

  pool.query(
    'UPDATE books SET title = $1, author = $2, published_date = $3, isbn = $4, genre = $5, pages = $6, publisher = $7, language = $8 WHERE id = $9',
    [title, author, published_date, isbn, genre, pages, publisher, language, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Book modified with ID: ${id}`);
    }
  );
};

// 5) Delete 

const deleteBook = (request, response , checkAPI_Key) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Book deleted with ID: ${id}`);
  });
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
