const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API documentation for an E-commerce platform',
    },
    host: 'localhost:8081',
    schemes: ['http'],
};

const outputFile = './Swagger/swagger_output.json';
const endpointsFiles = ['./Routes/*.js']; 

// swaggerAutogen(outputFile, endpointsFiles).then(() => {
//     require('../server');  
// });
swaggerAutogen(outputFile, endpointsFiles,doc);
