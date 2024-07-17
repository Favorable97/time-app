import pool from './mysqlPool.mjs'

const readRecords = async () => {
  try {
    const connection = await pool.getConnection();
    const result = await connection.query('SELECT * FROM `times` ORDER BY created_at DESC');
    connection.release();
    return result[0];
  } catch (error) {
    console.error('Error!', error);
    throw error;
  }
};

const insertRecord = async(time) => {
  try {
    const connection = await pool.getConnection()
    const result = await connection.query(`INSERT INTO times (time) VALUES ('${time}')`)
    console.log(`New time ${time} was saved to the DB`)
    connection.release()
    return result[0]
  } catch (error) {
    console.error('Error!', error)
    return error
  }
}

const deleteRecord = async(id) => {
  try {
    const connection = await pool.getConnection()
    const result = await connection.query(`DELETE FROM times WHERE id=${id}`)
    console.log(`Time with id ${id} was deleted from the DB`)
    connection.release()
    return result[0]
  } catch (error) {
    console.error('Error!', error)
    return error
  }
}
export { readRecords, insertRecord, deleteRecord }
