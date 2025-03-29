const passport=require('passport');
const { db } = require('../config/dbconfig');
const localstrategy=require('passport-local').Strategy;
const { checkPassword } = require('../utils/checkPassword'); 

passport.use(new localstrategy({
    usernameField:'email',
    passwordField:'password',
},async(email,password,done)=>{
    // console.log(email,password)
        const query="select * from AdminUser where email=?";
        db.query(query,[email],(err,data)=>{
            if(err){
                console.log(err)
            }
            const user=data[0];
            if(!user){
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            checkPassword(password,user.password,(err,isvalid)=>{
                if(err){
                    console.log(err)
                }
                if(!isvalid){
                    return done(null, false, { message: 'Incorrect email or password.' });
                }
                return done(null,user)
            })
        })
}

))
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    db.query(`SELECT * FROM AdminUser WHERE id = ?`, [id], (err, results) => {
        if (err) {
          return done(err);
        }
    
        const user = results[0];
        return done(null, user);
      });
})

const authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            return next(err)
        }
        if(!user){
            return res.status(401).json({message:'unauthorized'})
        }
        req.user=user;
        next();
    })(req,res,next)
}
module.exports={passport,authenticate};

// app.use('/api',authenticate,userRutes) //write in server js