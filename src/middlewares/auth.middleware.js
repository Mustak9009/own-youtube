import { ApiError } from "../utils/apiErrorHandler";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(async (req,res,next)=>{
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ","");
    if(!token){
        throw new ApiError(401,"Unauthorized access")
    }
})