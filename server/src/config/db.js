const mysql2 = require('mysql2')
require('dotenv').config()


const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 5
}).promise()

pool.getConnection()
        .then(connection => {
            console.log(`Connected to MySQL database as ID: ${connection.threadId}`)
            connection.release()
        })
        .catch(error => {
            console.log(error.message)
        })

module.exports = {
    pool
}