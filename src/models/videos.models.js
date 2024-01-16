import mongoose from 'mongoose';
const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    views :{
        type:Number,
        default:0
    },
    isPublished :{
        type:Boolean,
        default:true
    },
    thumbnail:String,
    description:String,
    duration :Number,
},{timestamps:true});

export const Video = mongoose.model('Video',videoSchema);