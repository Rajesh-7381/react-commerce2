const { db }= require("../config/dbconfig");
const bcrypt=require("bcrypt")
const SALT=parseInt(process.env.GEN_SALT);
// console.log(SALT)

const CheckAdminUserLogin=async(email,callback)=>{
    try {
      const query="SELECT * FROM AdminUser WHERE email = ?"
      db.query(query,[email],async(err,results)=>{
        if(err){
          return callback(err,null)
        }
          return callback(null,results[0]);
          //  console.log(results[0])
      })
    } catch (error) {
        console.error(error)
    }
  }
class AdminUserModel{
  static async findByUUID(uuid){
    // console.log(uuid)
    try {
      const query="select * from AdminUser where uuid=? and deleted_at is null";
      const rows=await db.promise().query(query,[uuid])
      // console.log(rows)
      return rows;
    } catch (error) {
        throw error
    }
  }
}

class User{
  constructor(name,mobile,email,password,image,uuid){
    this.name=name;
    this.email=email;
    this.mobile=mobile;
    this.password=password;
    this.image=image;
    this.uuid=uuid;
  }
  static async exists(email,mobile){
    const query="select count(*) as count from AdminUser where email=? or mobile=?";
    const result=await new Promise((resolve,reject)=>{
      db.query(query,[email,mobile],(err,results)=>{
        if(err){
          return reject(err);
        }
        resolve(results[0].count)
      })
    })
    return result > 0;
  }
    async Save(){
    const hashedPassword=await bcrypt.hash(this.password,SALT)
    const query="INSERT INTO AdminUser (name, mobile, email, password, image, UUID) VALUES (?, ?, ?, ?, ?, ?)"
    await new Promise((resolve,reject)=>{
      db.query(query,[this.name,this.mobile,this.email,hashedPassword,this.image ? this.image.secure_url : null,this.uuid],(err,results)=>{
        if(err){
          return reject(err);
        }
        resolve(results)
      })
    })
  }
}

class EmailCheck{
  static async findByEmail(email){
    try {
      const query = "SELECT * FROM AdminUser WHERE email=?";
      const [result]=await db.promise().query(query, [email]);
      return result;
    } catch (error) {
        console.error(error)
    }
  }
}
class MobileCheck{
  static async findByMobile(mobile){
    const query = "SELECT * FROM AdminUser WHERE mobile = ?";
    try {
      const [result] = await db.promise().query(query, [mobile]);
      return result;
    } catch (error) {
        console.error("Error in MobileCheck.findByMobile:", error);
        throw error; 
    }
  }
}

class forgotPassword{
  static async updatePassword(email,newPassword){
      try {
        const HashedSALT=await bcrypt.genSalt(SALT);
        // console.log(SALT)
        const hashedPassword=await bcrypt.hash(newPassword,HashedSALT);
        // console.log(hashedPassword)
        const query="UPDATE AdminUser SET password=? WHERE email=?";
        await new Promise((resolve,reject)=>{
          db.query(query,[hashedPassword,email],(err,results)=>{
            if(err){
              return reject(err)
            }
            resolve(results)
            // console.log(results)
          })
        })
      } catch (error) {
          console.error(error)
      }
  }
}

class TotalUser{
  static async TotalUser(){
    try {
      const query = "SELECT COUNT(id) AS count FROM AdminUser where role='user'"; // Alias 'count(id)' as 'total'
      // console.log(query)
      const result=await new Promise((resolve,reject)=>{
        db.query(query,(err,results)=>{
          // console.log(results)
          if(err){
            return reject(err)
          }
          resolve(results)
          // console.log(results[0].count)
        })
      })
      return result[0].count;
    } catch (error) {
        console.error(error)
    }
  }
}
class TotalAdmin{
  static async TotalAdmin(){
    try {
      const query = "SELECT COUNT(id) AS total FROM AdminUser where role='admin'"; // Alias 'count(id)' as 'total'
      const result=await new Promise((resolve,reject)=>{
        db.query(query,(err,results)=>{
          if(err){
            return reject(err)
          }
          resolve(results)
        })
        
      })
      return result[0].total
    } catch (error) {
        console.error(error)
    }
  }
}
class TotalSubAdmin{
  static async TotalSubAdmin(){
    try {
      const query = "SELECT COUNT(id) AS total FROM AdminUser where role='subadmin'"; // Alias 'count(id)' as 'total'
      const result=await new Promise((resolve,reject)=>{
        db.query(query,(err,results)=>{
          if(err){
            return reject(err)
          }
          resolve(results)
        })
      })
      return result[0].total
    } catch (error) {
        throw error
    }
  }
}
class getAllAdminSubadminUsers{
  static async TotalAdminSubAdminUser(){
    try {
      const query = "SELECT * FROM AdminUser where deleted_at is null"; // Alias 'count(id)' as 'total'
      const result=await new Promise((resolve,reject)=>{
        db.query(query,(err,results)=>{
          if(err){
            return reject(err)
          }
          resolve(results)
        })
      })
      return result;
    } catch (error) {
        throw error
    }
  }
}
class indvidualDetails{
  static async SingleUserAdminSubadmibDetails(id){
    try {
      const query = "select *  from AdminUser where id=?";
      const [result]=await db.promise().query(query,[id]);
      // console.log(result)
      return result;
    } catch (error) {
        throw error
    }
  }
}
class EditDetails{
  static async SingleData(id){
    try {
      const query = "select * from AdminUser where id=?";
      const [result]=await db.promise().query(query,[id]);
      return result;
    } catch (error) {
        throw error
    }
  }
}
class UpdateDetails{
  static async Update(name, mobile, email, password, role,id){
    try {
      const hashedPassword=await bcrypt.hash(password,SALT)
      // console.log(hashedPassword)
      const query = "UPDATE AdminUser SET name=?, mobile=?, email=?, password=?, role=? WHERE id=?";
      const [result]=await db.promise().query(query,[name, mobile, email, hashedPassword, role, id]);
      return result;
    } catch (error) {
        throw error
    }
  }
}
class Delete {
  static async deleteData(id) {
    const query = "UPDATE AdminUser SET deleted_at = CURRENT_TIMESTAMP WHERE id=?";
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
class SearchAdminSubAdminUser{
  static async SearchDetails(searchTerm){
    try {
      const query = "SELECT * FROM AdminUser WHERE role = 'user' AND DATE(created_at) = ?";
      const result = await new Promise((resolve, reject) => {
        db.query(query, [date], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
      return result;
    } catch (error) {
      console.error("Error fetching users by date:", error);
      throw error;
    }
  }
}
class registerUserParticularDate{
  static async SearchDate(date){
    //  console.log(date)
  // here issue is created_at stored date time format but i want to show date format thats why we use  'CAST' or 'DATE_FORMAT'
  // const query="SELECT COUNT(*) AS count FROM AdminUser WHERE role='user' AND CAST(created_at AS DATE) = ?";
    try {
      const query = "SELECT * FROM AdminUser WHERE role='user' and DATE(created_at) = ?";
      const  result=await new Promise((resolve,reject)=>{
        db.query(query,[date],(err,results)=>{
          if(err){
            return reject(err);
          }
          resolve(results)
          // console.log(results.length)
        })
      })
      // console.log(result.length)
      // console.log(result)
      return result;
    } catch (error) {
        console.error(error)
    }
  }
}
class registerUserfromrDateTotodate{
  static async SearchDate(fromdate,todate){
    try {
      // const formDate=fromdate.split("-").reverse().join("-")
      // const toDate=todate.split("-").reverse().join("-")
      // console.log(formDate + " "+toDate)
      const query = "SELECT COUNT(*) AS count FROM AdminUser WHERE DATE(created_at) BETWEEN ? AND ?";
      const result=await new Promise((resolve,reject)=>{
        db.query(query,[fromdate, todate],(err,results)=>{
          if(err){
            return reject(err);
          }
          resolve(results)
          // console.log(results)
        })
      })
      // console.log(result[0].count)
      return result[0].count;
    } catch (error) {
        console.error(error)
    }
  }
}
class getAllSubAdminData{
  static async getAll(){
    try {
      const query = "select * from  AdminUser where role in('subadmin' ,'user') and deleted_at is null";
      const result=await new Promise((resolve,reject)=>{
        db.query(query,(err,results)=>{
          if(err){
            return reject(err);
          }
          resolve(results)
        })
      })
    return result
    } catch (error) {
      
    }
  }
}

module.exports={ AdminUserModel,CheckAdminUserLogin,
  User,EmailCheck,MobileCheck,forgotPassword,TotalUser,
  TotalAdmin,TotalSubAdmin,getAllAdminSubadminUsers,
  indvidualDetails,EditDetails,UpdateDetails,Delete,
  SearchAdminSubAdminUser,registerUserParticularDate,
  registerUserfromrDateTotodate,getAllSubAdminData }

