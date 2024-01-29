import {asyncHandler} from '../utils/asyncHandler.js';

export const registerUser = asyncHandler(async (req,res)=>{
    const {userName,userType,email,fullName,password,avaTar,coverImage} = req.body;
    console.log(userName)
})