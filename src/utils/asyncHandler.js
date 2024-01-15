//Style - 1
export const asyncHandler  = (asyncFunction)=>{
    (req,res,next) =>{
        Promise.resolve(asyncFunction(req,res,next)).catch((err)=>next(err))
    }
}
//Style - 2
export const asyncHandler2 =  (asyncFunction) => async(req,res,next)=>{
    try{
        await asyncFunction(req,res,next);
    }catch(err){
        res.status(err.code || 500).json({
            sucess:false,
            message:"Something going wrong...!!!"
        });
        next(err);
    }
}