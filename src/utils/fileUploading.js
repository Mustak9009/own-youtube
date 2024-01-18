import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY  , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
const uploadOnCloudinary = async (localPath)=>{
    try{
        if(!localPath) return {error:'File path does not found...!!!'}
        cloudinary.uploader.upload(localPath,{resource_type:'auto'});
    }catch(err){
        console.log(err);
    }
}