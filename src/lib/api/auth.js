import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

export async function login(username, password) {
  const connection = await mysql.createConnection(dbConfig);
  const [prows] = await connection.query('CALL checkLoginCredentials(?)', [username]);
  
  const rows = prows[0]

  if (rows.length === 0) {
    connection.end();
    throw new Error('Account does not exist');
  }

  const isPasswordValid = await bcrypt.compare(password, rows[0].password);
  connection.end();

  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  return { username };
}

export async function signup(username, password) {
  const connection = await mysql.createConnection(dbConfig);
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the stored procedure
    const [results] = await connection.query('CALL createNewUser(?, ?)', [username, hashedPassword]);
    
    const response = results[0][0];
    if (response.error_code) {
      throw new Error(response.error_message);
    }

    return { username };
  } catch (err) {
    throw err;
  } finally {
    connection.end();
  }
}
