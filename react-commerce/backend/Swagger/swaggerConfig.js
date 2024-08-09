
const swaggerJSdoc=require("swagger-jsdoc")
// const swaggerAutogen=require("swagger-autogen")()

const swaggerDefinition={
    openapi:'3.0.0',
    info:{
        title: 'E-commerce API Documentation',
        version:'1.0.0',
        description:'API documentation for an E-commerce platform',
        contact:{
            name:'support team',
            url:'http://www.example.com/support',
            email: 'support@example.com',
        },
    },
    server:[
        {
            url: 'http://localhost:8081',
        },
    ],
};

const options={
    swaggerDefinition,
    apis:["./Routes/*.js"]
}

const swaggerSpec=swaggerJSdoc(options)

// const outputFile="./Swagger/swagger_output.json";
// const endpointsFiles=["./Routes/*.js"]
// swaggerAutogen(outputFile,endpointsFiles).then(()=>{
//   require("../server")
// })

module.exports={ swaggerSpec } 