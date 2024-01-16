import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        uniqu:true,
        lowercase:true,
        trim:true,
        index:true //I'ts help DataBase searching
    },
    userType:{
        type:String,
        enum:['USER','CREATOR'],
        default:'USER'
    },
    email:{
        type:String,
        required:true,
        uniqu:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please enter a password."],
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    avaTar:{ //Below we store 'URLs' not -> image's data
        type:String,
        required:true
    },
    coverImage:String,
    refreshToken:String,
},{timestamps:true});

export const User = mongoose.model('User',userSchema);