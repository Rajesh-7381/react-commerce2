const Joi=require("joi");

// for user registration
 const registerSchema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required().label('Name'), // Descriptive label for name
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().label('Mobile Number'), // Correct pattern for 10-digit mobile numbers
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required().label('Email'), // Email validation
    password: Joi.string().trim().min(8).max(25).required().label('Password').pattern(new RegExp('^[a-zA-Z0-9#?!@$%^&*\\-]{8,25}$')), 
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/png', 'image/webp', 'image/jpeg', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
    }).unknown().required().label('Image')
  });

//   for forgotting password
const passwordForgotSchema = Joi.object({
    password: Joi.string().trim().min(8).max(25).required().label('Password').pattern(new RegExp('^[a-zA-Z0-9#?!@$%^&*\\-]{8,25}')),
  });

module.exports={registerSchema,passwordForgotSchema}  