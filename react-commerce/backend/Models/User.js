const db = require("../config/dbconfig");

// check email or mobile exist
const getUserEmailOrMobile=async()=>{
  const query="select count(*) as count from AdminUser where email=? or mobile=?";
  return new Promise((resolve,reject)=>{
    db.query(query,[email,mobile],(err,results)=>{
      if(err) {
        return reject(err);
      }
      resolve(results[0].count)
    })
  })
}

// user create
const createUser=async(name, mobile, email, hashedPassword, imageUrl)=>{
  const query="insert into AdminUser (name, mobile, email, password, image) values (?, ?, ?, ?, ?)";
  return new Promise((resolve,reject)=>{
    db.query(query,[name, mobile, email, hashedPassword, imageUrl],(err,results)=>{
      if(err){
        return reject(err)
      }
      resolve(results)
    })
  })
}

module.exports={ getUserEmailOrMobile,createUser }