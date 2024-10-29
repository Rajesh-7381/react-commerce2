require("dotenv").config()
// We use Object.freeze to create an immutable object, meaning that once the object is created, its properties cannot be modified, added, or deleted. 
// This is useful for configuration objects like the one in your code, as it helps prevent accidental changes to important settings (like PORT in this case) throughout the application, ensuring that the configuration remains consistent and reliable.

const appConfig=Object.freeze({
    SERVERPORT:process.env.SERVERPORT
})

module.exports=appConfig; //use commonJS export