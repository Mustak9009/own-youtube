import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiErrorHandler.js';
import {User} from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/fileUploading.js';
import { ApiResponse } from '../utils/apiResponse.js';
export const registerUser = asyncHandler(async (req,res)=>{
    // Get user essential data : from user
    const {userName,email,fullName,password} = req.body;
    // Apply validation on : user data
    if([userName,email,fullName,password].some(field => field.trim() === '')){
        throw new ApiError(400,"All fields are required");
    }
    //Is user already exist: 
    const isUser = await User.findOne({
        $or:[{userName},{email}]
    });
    if(isUser){
        throw new ApiError(409,"User already exist");
    }
    // //Get files - img,etc.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImg[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required fields")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Something going wrong with avatar uploading...!!!")
    }
    //Upload in - DB(MongoDB)
    const newUser = await User.create({
        userName,
        fullName,
        password,
        email,
        avaTar:avatar.url,
        coverImage:coverImage?.url || ''
    });
    if(!newUser){
        throw new ApiError(500,"Something went wrong while registering the new user")
    }
    // return new ApiResponse(201,newUser,'created')
    return res.status(201).json(
        new ApiResponse(200,{id:newUser._id,email:newUser.email},"User registred successfully")
    )
})