import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiErrorHandler.js';
import {User} from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/fileUploading.js';
import { ApiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';
//Cookie options
const options = {
    httpOnly:true,
    secure:true
};
const generateAccessAndRefereshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"Something going wrong...!!!!");
    }
}
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
});
export const loginUser = asyncHandler(async (req,res)=>{
    //Get data
    //Cehck data
    //search user
    //compare password
    //if find return true then false
    //access and referesh token
    //send cookie
    const {userName,email,password} = req.body;
    if([userName,email,password].some(field=>field.trim() === '')){
        throw new ApiError(400,"All fields are required");
    }

    const user = await  User.findOne({$and:[{userName},{email}]}).select('password')
    if(!user){
        throw new ApiError(404,"User not found");
    }
    // const comparePasswod = await 
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(409,"User credentials doesn't match")
    }
    //Generates tokens
    const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id);
    //Loged user
    const logedUser = await User.findById(user._id).select('-password -refreshToken');
   
    return res.status(200)
    .cookie('accessToken',accessToken,options)
    .cookie('refereshToken',refreshToken,options)
    .json(new ApiResponse(200,{
        user:logedUser,accessToken,refreshToken
    },'User loged in sucessfully'));
})

export const logOutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:null
        }
    },{new:true})
    return res.status(200)
    .clearCookie('accessToken',options)
    .clearCookie('refereshToken',options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})

export const refereshAccessToken = asyncHandler(async (req,res)=>{
  try {
      const incommingRefereshToken = req.cookies.refereshToken || req.body.refereshToken;
      if(!incommingRefereshToken){
          throw new ApiError(401,"Unauthorized request..!!")
      }
      const decodeToken = jwt.verify(incommingRefereshToken,process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(decodeToken?.id);
      if(!user){
          throw new ApiError(401,"Invalid referesh token...!!")
      }
      if(incommingRefereshToken !== user?.refreshToken){
          throw new ApiError(401,"Referesh token is expired..!!")
      }
      const {accessToken,refreshToken:newRefreshToken}  = await generateAccessAndRefereshTokens(decodeToken?.id)
      return res.status(201)
      .cookie('accessToken',accessToken,options)
      .cookie('refereshToken',newRefreshToken,options)
      .json(
          new ApiResponse(201,{accessToken,refereshToken:newRefreshToken},"Access token refreshed")
      )
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid request token..!!")
  }
})