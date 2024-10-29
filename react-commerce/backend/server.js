const express = require("express");
const cors = require("cors");
const session=require("express-session")
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
const enqueryRoutes=require("./Routes/enquiry.routes")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const passport=require("./utils/SocialLogin")
const WebSocket = require('ws');
const clients = new Set();
const wss = new WebSocket.Server({ port: 8080 });
const xlsx=require("xlsx")
const swaggerFile = require('./Swagger/swagger_output.json');
const path = require("node:path");
const sharp=require("sharp");
const { authenticate } = require("./Middleware/PassPort");
const { default: csrftoken, default: csrfprotection } = require("./Middleware/csrfProtection");
// const redisClient = require('./config/redisClient'); 
const SERVERPORT=process.env.SERVERPORT;

// this 2 line requiered when connect with appConfig.js
// const appConfig=require("./config/appConfig")
// const {SERVERPORT}=appConfig


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

// Serve static files for profile images
// express.static :: is built in middleware function in  express that serves static files. It takes a directory path as an argument and serves the files within that directory
// path.join() is a method from Node.js's path module. It joins the provided path segments into a single path string.
// __dirname is a Node.js global variable that represents the directory name of the current 

// app.use("/profile", express.static(path.join(__dirname, "uploads/profile")));


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
app.use("/api",enqueryRoutes)
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


// for google login (implementation code in utils/sociallogin.js)
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/userdashboard2'); // Redirect to homepage or another page after successful login
});

//for facebook
app.get("/auth/facebook",passport.authenticate("facebook",{scope:["email"]}))
app.get("/auth/facebook/callback",passport.authenticate("facebook",{}),(req,res)=>{
    const user = req.user;
    // const token = jwt.sign(
    //   { email: user.email, role: user.role, id: user.id },
    //   process.env.JWTSECRET,
    //   { expiresIn: "1h" } 
    // )
  
    // if (user.role === 1) {
    //     res.redirect(`http://localhost:3000/dashboard?token=${token}&role=${user.role}`);
    // } else {
    //     res.redirect(`http://localhost:3000/dashboard2?token=${token}&role=${user.role}`);
    // }
    res.redirect('http://localhost:3000/userdashboard2'); // Redirect to homepage or another page after successful login

    // res.redirect(`http://localhost:3000/google/success?token=${token}&role=${user.role}&id=${user.id}&email=${user.email}`);
})


app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  const user = req.user;
  const token = jwt.sign(
      { email: user.email, role: user.role, id: user.id },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
  );
  res.redirect('http://localhost:3000/userdashboard2'); 
  // res.redirect(`http://localhost:3000/success?token=${token}&role=${user.role}&id=${user.id}&email=${user.email}`);
});
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

  
app.listen(SERVERPORT, () => {
  console.log(`server listening at port http://localhost:${SERVERPORT}`);
  console.log(`Swagger UI is available at http://localhost:${SERVERPORT}/api-docs`);
}); 