const { db }= require("../config/dbconfig");
const bcrypt=require("bcrypt")
const SALT=10;

const CheckAdminUserLogin=async(email,callback)=>{
    
    const query="SELECT * FROM AdminUser WHERE email = ?"
    db.query(query,[email],async(err,results)=>{
      if(err){
        return callback(err,null)
      }
        return callback(null,results[0]);
        //  console.log(results[0])
    })
  }
class AdminUserModel{
  static async findByUUID(uuid){
    try {
      const query="select * from AdminUser where uuid=?";
      const [rows]=await db.Promise().query(query,[uuid])
      return rows
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

const emailExist=async(email,callback)=>{
  const query="SELECT * FROM AdminUser WHERE email = ?"
  db.query(query,[email],(err,results)=>{
    if(err){
      return callback(err,null)
    }
  })
}

module.exports={ AdminUserModel,CheckAdminUserLogin,User}