const CustomError=require('./CustomError');

module.exports=(error,req,res,next)=>{
    error.statusCode=error.statusCode || 500;
    error.status=error.status || 'error';
    

    if (error.name === "CastError") {
        const message = `Invalid value ${error.value} for id ${error.path}`;
        error = new CustomError(message, 404);
      }
    
      //Mongoose duplicate key
      if (error.code === 11000) {
        const message = "Duplicate feild entered";
        error = new CustomError(message, 400);
      }
    
      //mongoose validation error
      if (error.name === "ValidationError") {
        error = new CustomError(error.message, 400);
      }

      if (error.name === "TokenExpiredError") {
        error = new CustomError("Session Expired. Please login again", 401);
      }

      if (error.name === "JsonWebTokenError") {
        error = new CustomError("Invalid token. Please login again", 401);
      }
    
      res
        .status(error.statusCode )
        .json({ status:error.status,error: error.message || "Server Error" });
     
}