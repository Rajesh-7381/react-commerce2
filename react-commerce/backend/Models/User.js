const { db }= require("../config/dbconfig");
const bcrypt=require("bcrypt")
const SALT=parseInt(process.env.GEN_SALT);
// const fs=require("fs").promises; // when deleteing
const fs=require("fs");
const redisClient=require("../config/redisClient")
// console.log(SALT)
const { sheets } = require('../service/gSheet'); // Adjust the path as necessary
const { validateFormat, loginAttempt, executeHook } = require("../Middleware/user.hooks");
const { ne } = require("@faker-js/faker");
const { logger } = require("../utils/logger");

const CheckAdminUserLogin=async(email,callback)=>{
  const preHooks=[validateFormat]
  const postHooks=[loginAttempt]
    try {
      for(const hook of preHooks){
        await executeHook(hook,{email})
      }
      const query="SELECT * FROM AdminUser WHERE email = ?"
      db.query(query,[email],async(err,results)=>{
        if(err){
          return callback(err,null)
        }
          const user=results[0];
          for(const hooks of postHooks){
            await executeHook(hooks,{user})
          } 
          return callback(null,results[0]);
          //  console.log(results[0])
          
      })
    } catch (error) {
        console.error(error)
    }
  }

class checkFailedAttempts{
  static async checkFailedAttempts(lockAccount,failedAttempts,id,callback){
    const query=`update AdminUser set failed_attempts = ? ${lockAccount} where id=?`
    db.query(query,[failedAttempts,id],async(err)=>{
      if(err){
        console.log(err)
        callback('unable to process login attempts')
        return;
      }
      const message=failedAttempts >=3 ? '🚫 Account locked due to too many failed attempts. Try again in 24 hours.' : `⚠️ Invalid email or password. You have ${3 - failedAttempts} attempts left.`
      callback(message);
    })
  }
}  

class resetFailedAttempts{
  static async resetFailedAttempts(id){
    const query=`update AdminUser set failed_attempts=0,account_locked_until=null where id=?`
    try {
      db.query(query,[id],(err)=>{
        if(err){
          console.log(err)
        }
      })
    } catch (error) {
        throw error
    }
  }
}

class UserActivityLog{
  static async UserActivityLog(id,action,ip,user_agent){
    try {
      const logquery='insert into UserActivityLog (user_id,action,ip_address,device_info) values (?,?,?,?)';
      db.query(logquery,[id,action,ip,user_agent],(err,results)=>{
        if(err){
          console.log(err)
        }
      })
    } catch (error) {
       console.log(error)
    }
  }
}

class Logout{
  static async Logout(id,action,ip,user_agent){
    try {
      const logquery='insert into UserActivityLog (user_id,action,ip_address,device_info) values (?,?,?,?)';
      db.query(logquery,[id,action,ip,user_agent],(err,results)=>{
        if(err){
          console.log(err)
        }
      })
    } catch (error) {
       console.log(error)
    }
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

class User {
  constructor(name, mobile, email, password, image, uuid) {
      this.name = name;
      this.email = email;
      this.mobile = mobile;
      this.password = password;
      this.image = image;
      this.uuid = uuid;
  }

  static async exists(email, mobile) {
      const query = "SELECT COUNT(*) AS count FROM AdminUser  WHERE email=? OR mobile=?";
      const result = await new Promise((resolve, reject) => {
          db.query(query, [email, mobile], (err, results) => {
              if (err) {
                  return reject(err);
              }
              resolve(results[0].count);
          });
      });
      return result > 0;
  }
  static async storeOTP(email, otp) {
    try {
      await redisClient.set(`OTP_${email}`, otp, 'EX', 600); // Store OTP for 10 minutes
      console.log(`✅ OTP stored for ${email}: ${otp}`);
    } catch (error) {
      console.error(`❌ Error storing OTP for ${email}:`, error);
      throw new Error("Error storing OTP");
    }
  }

  async Save() {
      const hashedPassword = await bcrypt.hash(this.password, SALT);
      const query = "INSERT INTO AdminUser  (name, mobile, email, password, image, UUID) VALUES (?, ?, ?, ?, ?, ?)";
      await new Promise((resolve, reject) => {
          db.query(query, [this.name, this.mobile, this.email, hashedPassword, this.image ? this.image.secure_url : null, this.uuid], (err, results) => {
              if (err) {
                  return reject(err);
              }
              resolve(results);
          });
      });
  }

  async logEnquiry(message) {
      try {
          // Hash the password before logging the enquiry
          const hashedPassword = await bcrypt.hash(this.password, SALT);

          // GOOGLE SHEET ENTRY
          const response = await sheets.spreadsheets.values.append({
              spreadsheetId: process.env.GOOGLE_SHEET_ID,
              range: 'AdminUsers!A:E', // Adjusted range to include all fields
              insertDataOption: 'INSERT_ROWS',
              valueInputOption: 'RAW',
              requestBody: {
                  values: [[this.uuid, this.name, this.email, hashedPassword, this.mobile]], // Include UUID
              },
          });

          if (response.status !== 200) {
              console.error('Error adding data to Google Sheets:', response);
          }
      } catch (error) {
          console.error('Error logging enquiry:', error);
      }
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

// class forgotPassword{
//   static async updatePassword(email,newPassword){
//       try {
//         const HashedSALT=await bcrypt.genSalt(SALT);
//         // console.log(SALT)
//         const hashedPassword=await bcrypt.hash(newPassword,HashedSALT);
//         // console.log(hashedPassword)
//         const query="UPDATE AdminUser SET password=? WHERE email=?";
//         await new Promise((resolve,reject)=>{
//           db.query(query,[hashedPassword,email],(err,results)=>{
//             if(err){
//               return reject(err)
//             }
//             resolve(results)
//             // console.log(results)
//           })
//         })
//       } catch (error) {
//           console.error(error)
//       }
//   }
// }

class forgotPassword{
  static async updatePassword(email,newpassword){
    const connection=await db.promise().getConnection();
    await connection.beginTransaction();

    try {
      const querySelect = "SELECT password FROM AdminUser WHERE email = ?";
      const [user]=await new Promise((resolve,reject)=>{
        db.query(querySelect,[email],(err,results)=>{
          if(err) return reject(err);
          resolve(results)
        })
      })
      if(!user){
        logger.warn('user not found')
        throw new Error('user not found')
      }

      const currentPassword=user.password;
      const isSamePassword=await bcrypt.compare(newpassword,currentPassword)
      if(isSamePassword){
        logger.warn('New password cannot be the same as the old password')
        throw new Error("New password cannot be the same as the old password");
      }

      const hashedPassword=await bcrypt.hash(newpassword,SALT);

      const queryUpdate = "UPDATE AdminUser SET password = ? WHERE email = ?";
      await new Promise((resolve,reject)=>{
        db.query(queryUpdate,[hashedPassword,email],(err,results)=>{
          if (err) return reject(err);
          resolve(results);
        })
      })

      // commit the transaction
      await connection.commit();
      logger.warn('transaction commited')
      return true

    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        logger.warn('transaction rollbacked')
        throw error;

    }finally{
      connection.release();
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
    // const cacheKey='admin_subadmin_users'
    try {
      // const cacheData=await redisClient.get(cacheKey)
      // if(cacheData){
      //   console.log('Cache Hit: Returning data from Redis');
      //   return JSON.parse(cacheData);
      // }
      const query = "SELECT * FROM AdminUser where deleted_at is null";
      const result=await new Promise((resolve,reject)=>{
        db.query(query,(err,results)=>{
          if(err){
            return reject(err)
          }
          resolve(results)
        })
      })

      // await redisClient.setEx(cacheKey,3600,JSON.stringify(result))
      // console.log('Cache Miss: Data fetched from MySQL and cached');
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


// class Delete {
//   static async deleteData(id) {
//      //locally delete from file
//   // delete:async(id)=>{
//   //   const imagegettingquery="select * from brands where id=?";
//   //   const deletequery="delete from brnds where id=?"
   
//   //     db.query(imagegettingquery,[id],(err,result)=>{
//   //       if(err){
//   //         return err;
//   //       }
//   //       const imageurl=result[0].image;
//   //       const localydeletepath=path.join(__dirname,`../uploads/Brands/${imageurl}`)
//   //       try {
//   //         fs.promises.access(localydeletepath)
//   //         fs.promises.unlink(localydeletepath)
//   //       } catch (error) {
//   //           if(error.code ==='ENOENT'){
//   //             console.log("file does not exists!")
//   //           }else if(error.code ==='EPERM'){
//   //             console.log("operation not permited")
//   //           }else{
//   //             console.log("error deleting file")
//   //           }
//   //       }
//   //     })

//   //     try {
//   //       const deletedata=await new Promise((resolve,reject)=>{
//   //         db.query(deletequery,[id],(err,result)=>{
//   //           if(err){
//   //             reject(err)
//   //           }else{
//   //             resolve(result)
//   //           }
//   //         })
//   //       })
//   //       return deletedata;
//   //     } catch (error) {
//   //         throw error
//   //     }
      
//   // },
//   }
// }



class SearchAdminSubAdminUser{
  static async SearchDetails(searchTerm){
    console.log(searchTerm)
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

class DOCX{
  static async docx(){
    try {
      // in this way we provide data but memory usage(spike) high 
      // const data=await fs.readFile('./backup.txt','utf8');
      //   return data;

      // using stream we can easily chunk of data send not all data send at a time 
      return new Promise((resolve,reject)=>{
        const readStream=fs.createReadStream('./backup.txt','utf-8');
        let data='';

        readStream.on('data',(chunk)=>{
          data +=chunk;
        })

        readStream.on('end',()=>{
          resolve(data)
        })

        readStream.on('error',(err)=>{
          reject(err)
        })

      })
      
    } catch (error) {
        console.log("unable to read")
        throw error
    }
  }
  static async updateDocx(doc){
    const writeableStream=fs.createWriteStream('./backup.txt',{encoding:"utf-8"})
    writeableStream.on('finish',()=>{
    })
    writeableStream.on('error', (err) => {
      console.error('An error occurred:', err.message);
    });
    writeableStream.write(doc+'\n');

    writeableStream.end();
  }
}

module.exports={ AdminUserModel,CheckAdminUserLogin,UserActivityLog,
  resetFailedAttempts,checkFailedAttempts,User,
  EmailCheck,MobileCheck,forgotPassword,TotalUser,
  TotalAdmin,TotalSubAdmin,getAllAdminSubadminUsers,
  indvidualDetails,EditDetails,UpdateDetails,Delete,
  SearchAdminSubAdminUser,registerUserParticularDate,
  registerUserfromrDateTotodate,getAllSubAdminData,DOCX,Logout }