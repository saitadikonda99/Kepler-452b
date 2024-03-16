import mysql2 from 'mysql2';

export const pool = mysql2
  .createPool({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USERNAME,
    password: process.env.NEXT_PUBLIC_DB_NAME,
    database: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: parseInt(process.env.NEXT_PUBLIC_DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 5,
  })
  .promise();

pool.getConnection()
    .then( connection => {
        console.log(`Connected to MySQL database ${ process.env.DB_NAME } on thread ${ connection.threadId }`)
        connection.release();
    })
    .catch( error => {
        console.log(`Error connecting to MySQL database error: ${ error.message }`)
    });