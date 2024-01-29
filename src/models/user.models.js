import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        uniqu:true,
        lowercase:true,
        trim:true,
        index:true //I'ts help DataBase searching
    },
    // userType:{
    //     type:String,
    //     enum:['USER','CREATOR'],
    //     default:'USER'
    // },
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
    avaTar:{ //Below we store 'URLs' not -> image's data
        type:String,
        required:true
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    coverImage:String,
    refreshToken:String,
},{timestamps:true});
userSchema.pre('save',async function (next){ //Middleware to => 'hash' password
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
    
});
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id:this._id,
            userName:this.userName,
            fullName:this.fullName,
            email:this.email,
            avatar:this.avaTar
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model('User',userSchema);