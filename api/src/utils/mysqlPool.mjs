import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'mysql',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'time_db',
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

/*pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createTimeTable = CREATE_TIMES_TABLE_SQL
    connection.query(createTimeTable, (err) => {
      if (!err) {
        console.log('Times table was created')
      }
    })
    connection.release()
  }
})*/
const createConnection = async() => {
  console.log('Start async create new table if not exist')
  try {
    const connection = await pool.getConnection()
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createTimeTable = CREATE_TIMES_TABLE_SQL
    await connection.query(createConnection)
    connection.release()
  } catch (error) {
    console.log('Error connecting to MySQL DB:', error)
  }
}

export default pool
