import mongoose from 'mongoose';
import aggregatePaginateV2 from 'mongoose-aggregate-paginate-v2'
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
videoSchema.plugin(aggregatePaginateV2);
export const Video = mongoose.model('Video',videoSchema);