const express = require("express");
const app = express(); //create express.js(framework) instance 
const cors = require("cors");
const session=require("express-session")
const http=require('http')
const socketIo=require('socket.io')
const httpServer=http.createServer(app)
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
const { morganMiddleware } = require('./utils/logger');
const WebSocket = require('ws');
const clients = new Set();
const wss = new WebSocket.Server({ port: 8080 });
const xlsx=require("xlsx")
const swaggerFile = require('./Swagger/swagger_output.json');
const path = require("node:path");
const sharp=require("sharp");
const { authenticate } = require("./Middleware/PassPort");
const { default: csrftoken, default: csrfprotection } = require("./Middleware/csrfProtection");
const { ar } = require("@faker-js/faker");
// const redisClient = require('./config/redisClient'); 
const SERVERPORT=process.env.SERVERPORT;

// this 2 line requiered when connect with appConfig.js
// const appConfig=require("./config/appConfig")
// const {SERVERPORT}=appConfig

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

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// Serve static files for profile images
// express.static :: is built in middleware function in  express that serves static files. It takes a directory path as an argument and serves the files within that directory
// path.join() is a method from Node.js's path module. It joins the provided path segments into a single path string.
// __dirname is a Node.js global variable that represents the directory name of the current 

// app.use("/profile", express.static(path.join(__dirname, "uploads/profile")));

// for logger
app.use(morganMiddleware)
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




httpServer.listen(SERVERPORT, () => {  
  console.log(`server listening at port http://localhost:${SERVERPORT}`);
  console.log(`Swagger UI is available at http://localhost:${SERVERPORT}/api-docs`);
})
