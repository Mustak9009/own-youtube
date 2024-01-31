import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiErrorHandler.js';
import {User} from '../models/user.models.js';
import {uploadOnCloudinary} from '../utils/fileUploading.js';
export const registerUser = asyncHandler(async (req,res)=>{
    // Get user essential data : from user
    const {userName,email,fullName,password} = req.body;
    console.log(userName,email,fullName,password);
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
    //Get files - img,etc.
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImg[0]?.path;

    if(!avatarLocalPath ||  !coverImageLocalPath){
        throw new ApiError(400,"Images are required fields")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar || !coverImage){
        throw new ApiError(400,"Something going wrong with image uploading...!!!")
    }
    //Upload in - DB(MongoDB)
    res.status(201).json({message:"User created!!"})
})