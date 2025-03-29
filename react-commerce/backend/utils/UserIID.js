const { v4: uuidv4 } = require("uuid");
const { db }= require("../config/dbconfig");


const UUID=async()=>{
    let isUnique=false;
    let newUUID;

    while(!isUnique){
        newUUID=uuidv4();
        isUnique=await CheckUnique(newUUID);
    }
    return newUUID;
}

const CheckUnique = async (uuid) => {
  return new Promise((resolve, reject) => {
    const query = "select count(*) as count from AdminUser where UUID=?";
    db.query(query, [uuid], (err, results) => {
      if(err){
        return reject(err)
      }
      resolve(results[0].count === 0)
    });
  });
};

module.exports={ UUID }