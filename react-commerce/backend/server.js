const express = require("express");
const cors = require("cors");
const passport = require('passport');
const session=require("express-session")
const GoogleOauthStrategy = require('passport-google-oauth20').Strategy;
// db
const { db } = require("./config/dbconfig");
// for multiple database
// const {db,db2}=require("./config/dbconfig");
require("dotenv").config(); //note.txt
const bodyParser = require("body-parser"); //note.txt
const morgan = require("morgan"); //note.txt
// const checkauth=require("./Auth/RouteCheckAuth");
const swaggerUi = require('swagger-ui-express');
const cluster=require("node:cluster");
const os=require("os")
const ejs=require("ejs")

const errhandler = require("./Middleware/ErrorHandler");
// const { swaggerSpec }= require('./Swagger/swaggerConfig');
const userRoutes=require("./Routes/userRoutes")
const cmsRoutes=require("./Routes/cmsRoutes")
const categoryRoutes=require("./Routes/categoryRoutes")
const productRoutes=require("./Routes/productRoutes")
const bannerRoutes=require("./Routes/bannerRoutes")
const brandRoutes=require("./Routes/brandRoute")
const frontRoutes=require("./Routes/frontRoutes");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const WebSocket = require('ws');
const clients = new Set();
const wss = new WebSocket.Server({ port: 8080 });
const xlsx=require("xlsx")
const swaggerFile = require('./Swagger/swagger_output.json');
const path = require("node:path");
const sharp=require("sharp");
const { authenticate } = require("./Middleware/PassPort");

const app = express(); //create express.js(framework) instance
// middleware
// setup session
app.use(session({secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false, cookie: { secure: false, maxAge: 20000 }})); //maxage 24 hours
app.use(cors()); //enables Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(express.json()); // parses incoming requests with JSON payloads.
// Use Morgan middleware for logging HTTP requests
// app.use(morgan('dev')); //logs HTTP requests in a concise format.
// bodyParser.json() and bodyParser.urlencoded({ extended: true }): parse incoming request bodies in JSON and URL-encoded formats, respectively.
app.use(bodyParser.json());  //Parses incoming JSON-formatted request bodies and makes them accessible on the req.body property of the request object.
app.use(bodyParser.urlencoded({ extended: true })); //Parses incoming URL-encoded request bodies and makes them accessible on the req.body property.
// The extended: true option enables parsing of nested objects and arrays, allowing for more complex data structures.
app.use(errhandler);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

  passport.use(new GoogleOauthStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK, // Ensure this matches your Google Cloud Console
    scope: ["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log(profile)
      const email = profile.emails[0].value;
      const userQuery = "SELECT * FROM AdminUser WHERE email = ?";
      const insertQuery = `INSERT INTO AdminUser (googleId,name, email, image, mobile, password) VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(userQuery, [email], (err, results) => {
        if (err) {
          console.error('Error querying database: ', err);
          return done(err, null);
        }

        if (results.length > 0) {
          // User already exists
          return done(null, results[0]); //if user exist it show with user inforamtion
        } else {
          // User does not exist, create new user
          const user = {
            GoogleId:profile.id,
            name: profile.displayName,
            email: email,
            image: profile.photos[0] ? profile.photos[0].value : null,
            mobile: null, 
            password: null 
          };

          db.query(insertQuery, [user.GoogleId,user.name, user.email, user.image, user.mobile, user.password], (err, results) => {
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
  }
  ));

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


// Serve static files for profile images
// express.static :: is built in middleware function in  express that serves static files. It takes a directory path as an argument and serves the files within that directory
// path.join() is a method from Node.js's path module. It joins the provided path segments into a single path string.
// __dirname is a Node.js global variable that represents the directory name of the current 

// app.use("/profile", express.static(path.join(__dirname, "uploads/profile")));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/userdashboard2'); // Redirect to homepage or another page after successful login
});

// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api",userRoutes)//register and login and check email and check mobile
// app.use("/api",authenticate,userRoutes)//register and login and check email and check mobile
app.use("/api",cmsRoutes) //cms api
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",brandRoutes)
app.use("/api",bannerRoutes)
app.use("/api",frontRoutes)
// console.log(__dirname)

app.set('view engine','ejs')
app.set('show','../views/index')
app.get("/",(req,res)=>{
  const data2 = {
    username: 'Rajesh!',
    date: new Date().toDateString(),
    Swagger: 'http://localhost:8081/api-docs'
  };
  
  res.render('index',data2)
})

wss.on('connection', (ws) => {
  console.log('Client connected');
  // Add client to the set
  clients.add(ws);

  ws.on('message', async (message) => {
    console.log(`Received message: ${message}`);
    // Handle incoming message from client
    // Convert the message to a string before broadcasting it
    const messageString = message.toString();
    
    const genAI = new GoogleGenerativeAI(process.env.API_KEYGEMINI);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = messageString;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      // console.log(response);
      
      // Send response back to the client
      ws.send(response);
      
      // Broadcast the original message to other clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(messageString);
        }
      });
    } catch (error) {
      console.log(error);
      // Send error response back to the client
      ws.send('Error occurred while processing your message');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    // Remove client from the set
    clients.delete(ws);
  });
  // Send data to client
  // ws.send('Hello from backend!');
});

// sharp('./images.jpeg').resize(200).toFormat('webp',{palette:true}).toFile('op5.webp')

app.listen(process.env.SERVERPORT, () => {
  console.log(`server listening at port http://localhost:${process.env.SERVERPORT}`);
  console.log(`Swagger UI is available at http://localhost:${process.env.SERVERPORT}/api-docs`);
});
