
const pool = require('./db'); 

const validateUser = async (req, res, next) => 
{
   const { username, email, password } = req.headers;  

  try {
    const query = `SELECT password FROM users WHERE username = '${username}' AND email = '${email}'`;
    
    const result = await pool.query(query);

    if (result.rows.length === 1) 
    {
      const databasePassword = result.rows[0].password;  //get password from database

      if (password === databasePassword) //Match header pass password and database stored password
      {
        console.log('Password match');
       
        next();                 // User validated successfully, pass control to the next middleware
        // return res.status(401).json({ error: 'Password Match Successfully 😉🙂' });
      } 
      else 
      {
        console.log('Password mismatch');
        return res.status(401).json({ error: 'Unfortunatlly Password Not-Match 😥😒' });
      }
    } 
    else 
    {
      console.log('User not found 🤨');
      return res.status(401).json({ error: 'User not found' });
    }
  } 
  catch (error) 
  {
    console.error('Error executing query', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = validateUser;
