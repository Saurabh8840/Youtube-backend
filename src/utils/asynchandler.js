//return promise
//highorder function 
//make sure error pass to next(err)
//this remove the need of try and catch 





const asyncHandler=(requestHandler)=>{

    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export default asyncHandler;


