import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiErrorHandler.js';
export const registerUser = asyncHandler(async (req,res)=>{
    // Get user essential data : from user
    const {userName,email,fullName,password} = req.body;
    console.log(userName,email,fullName,password);
    // Apply validation on : user data
    if([userName,email,fullName,password].some(field => field.trim() === '')){
        throw new ApiError(400,"All fields are required");
    }
    res.status(201).json({message:"User created!!"})
})