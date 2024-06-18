
//createPool is used to create a connection pool, which is a group of connections that are managed by the mysql2 library. createConnection is used to create a single connection to the database.
// createConnection is used to create a single connection to the database.
//The choice between createPool and createConnection depends on the specific needs of your application. 
// If you need to execute a large number of queries or need to improve the performance of your application, you should use createPool. If you only need to execute a few queries or need to perform a one-time operation, you can use createConnection.
require('dotenv').config();
const mysql2=require("mysql2");
const {DATABASERROR}=require("../Error/AppError");

const db = mysql2.createPool({
    // connectionLimit: 10, // Number of connections to create at once
    host: process.env.LOCALHOST, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
  });

  function handleConnectionError(err){
    console.error('Error connecting to the database:', err);
    throw new DATABASERROR('Failed to connect to the database');
  }
  
  // Check if the pool was created successfully
  db.getConnection((err, connection) => {
    if (err) {
      handleConnectionError(err);
      // console.error('Error connecting to the database:', err);
      return;
    }
    if (connection) {
    //   console.log('Connected to the database');
      connection.release(); // Release the connection back to the pool
    } else {
        // console.error('No connection available');
        handleConnectionError(new Error('No connection available'));
        // Call this function when you need to end the pool, for example, during application shutdown
        endConnectionPool();
    }
  });

  //   for multiple database
// const db2 = mysql2.createPool({
//     // connectionLimit: 10, // Number of connections to create at once
//     host: process.env.LOCALHOST2, 
//     user: process.env.USER2,
//     password: process.env.PASSWORD2,
//     database: process.env.DATABASE2,
//     port: process.env.PORT2
//   });


  // for multiple databse connection purpose
//   db2.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     if (connection) {
//       console.log('Connected to the database2');
//       connection.release(); // Release the connection back to the pool
//     } else {
//         console.error('No connection available');
//         // Call this function when you need to end the pool, for example, during application shutdown
//         endConnectionPool();
//     }
//   });
  
  // Function to end the pool
  function endConnectionPool() {
    db.end((err) => {
      if (err) {
        console.error('Error ending the connection:', err);
        return;
      }
      console.log('Connection pool ended gracefully');
    });
  }
  

// module.exports={db,db2};
module.exports={db,endConnectionPool};