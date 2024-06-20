const {AppError} =require("../Error/AppError");

const ErrorHandler=(err,req,res,next)=>{
    console.error('Error',err);

    if(!err.isOperational){
        console.error(err.stack)
    }

    res.status(err.statusCode || 500).json({
        status:err.status || 'error',
        message:err.message || 'Internal server error',
    })
}

module.exports=ErrorHandler;