class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4') ? 'Fail' : 'Error';  //If the status code starts with '4', it's a client error ('Fail'). Otherwise, it's a server error ('Error')
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class DatabaseError extends AppError{
    constructor(message){
        super(message,500);
    }
}

module.exports={AppError,DatabaseError};