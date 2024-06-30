const { response } = require('express')

const Pool =  require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodecrud',
    password: 'Rutu@123',
    port: 5432,
  });


  
// 1) Read all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    return response.status(200).json(results.rows);
  });
};

// 2) Read user with a particular id
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// 3) Create a new user
const addUser = (request, response) => {
  const { username, email, password } = request.body;

  pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0]);
    });
};

// 4) Update a user with a particular id
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { username, email, password } = request.body;

  pool.query(
    'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4',
    [username, email, password, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
      return results;
    }
  );
};

// 5) Delete a user with a particular id
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
