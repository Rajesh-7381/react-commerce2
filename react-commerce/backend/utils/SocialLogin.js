// googleAuth.js
const passport = require('passport');
const GoogleOauthStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { db } = require("../config/dbconfig");
const { v4: uuidv4 } = require("uuid");

passport.use(new GoogleOauthStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
  scope: ["profile", "email"]
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const userQuery = "SELECT * FROM AdminUser WHERE email = ?";
    const UUID = uuidv4();
    const insertQuery = `INSERT INTO AdminUser (UUID,social_Login_Provider,SocialID, name, email, image, mobile, password) VALUES (?,?, ?, ?, ?, ?, ?,?)`;

    db.query(userQuery, [email], (err, results) => {
        // console.log(results)
      if (err) {
        console.error('Error querying database: ', err);
        return done(err, null);
      }

      if (results.length > 0) {
        // User already exists
        return done(null, results[0]);
      } else {
        // User does not exist, create new user
        const user = {
          UUID:UUID,
          social_Login_Provider:"google",
          SocialID: profile.id,
          name: profile.displayName,
          email: email,
          image: profile.photos[0] ? profile.photos[0].value : null,
          mobile: null,
          password: null
        };

        db.query(insertQuery, [user.UUID,user.social_Login_Provider,user.SocialID, user.name, user.email, user.image, user.mobile, user.password], (err, results) => {
            // console.log("res2",results)
          if (err) {
            console.error('Error inserting into database: ', err);
            return done(err, null);
          }

          // Add the newly created user ID to the `user` object
          user.id = results.insertId;
          return done(null, user);
        });
      }
    });
  } catch (error) {
    console.error('Error in passport strategy: ', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM AdminUser WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return done(err, null);
    }
    return done(null, results[0]);
  });
});
 

// for facebbok
passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOKAPPID,
    clientSecret:process.env.FACEBOOKAPPSECRET,
    callbackURL:process.env.CALLBACKURL2,
    profileFields:["id","displayName","photos","email"]
},
    async(acessToken,RefreshToken,profile,done)=>{
        try {
            const email=profile.emails[0].value;
            const getQuery="select * from AdminUser where email=?";
            const insQuery="insert into AdminUser (UUID,social_Login_Provider,  SocialID,name,email,password,image,mobile) values (?,?,?,?,?,?,?,?)";
            const UUID = uuidv4();
            db.query(getQuery,[email],(err,data)=>{
                // console.log(data)
                if(err){
                    console.log(err)
                    return done(err,null)
                }
                if(data.length > 0){
                    // console.log(1)
                    return done(null,data[0]) 
                }else{
                    // console.log(2)
                    const user={UUID:UUID,social_Login_Provider:'facebook',SocialID:profile.id,name:profile.displayName,email:email,password:null,image:profile.photos[0].value,mobile:null}
                    // console.log(user)
                    db.query(insQuery,[user.UUID,user.social_Login_Provider,user.SocialID,user.name,user.email,user.password,user.image,user.mobile],(err,results)=>{
                        if(err){
                            return done(err,null)
                        }
                        user.id=results.insertId;
                        return done(null,user)
                    })
                }
            })
        } catch (error) {
            return done(error,null)
        }
    }
))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    const query="select * from AdminUser where id=?";
    db.query(query,[id],(err,data)=>{
        if(err){
            return done(err,null)
        }
        return done(null,data[0])
    })
})

// github
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8081/auth/github/callback',
  scope: ["user:email"]
}, (accessToken, refreshToken, profile, done) => {
  try {
      const email = profile.emails[0].value;
      const getQuery = "SELECT * FROM Users2 WHERE email=?";
      const insQuery = "INSERT INTO Users2 (social_login_provider, social_login_id, name, email, password, image) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(getQuery, [email], (err, data) => {
          if (err) {
              console.log(err);
              return done(err, null);
          }
          if (data.length > 0) {
              return done(null, data[0]);
          } else {
              const user = {
                  social_login_provider: 'github',
                  social_login_id: profile.id,
                  name: profile.displayName,
                  email: email,
                  password: null,
                  image: profile.photos[0].value
              };
              db.query(insQuery, [user.social_login_provider, user.social_login_id, user.name, user.email, user.password, user.image], (err, results) => {
                  if (err) {
                      console.log(err);
                      return done(err, null);
                  }
                  user.id = results.insertId;
                  return done(null, user);
              });
          }
      });
  } catch (error) {
      console.log("Error in passport", error);
      return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM Users2 WHERE id=?";
  db.query(query, [id], (err, data) => {
      if (err) {
          console.log(err);
          return done(err, null);
      }
      return done(null, data[0]);
  });
});

module.exports = passport;