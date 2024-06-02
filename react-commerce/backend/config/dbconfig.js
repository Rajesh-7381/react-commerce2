const mysql2=require("mysql2");

const db=mysql2.createPool({
    host:process.env.LOCALHOST, 
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.PORT
});

module.exports=db;