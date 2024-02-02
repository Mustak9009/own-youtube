import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY  , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
const uploadOnCloudinary = async (tempPath)=>{
    try{
        if(!tempPath) return null;
        const res = await cloudinary.uploader.upload(tempPath,{resource_type:'auto'});
        fs.unlinkSync(tempPath);
        return res;
    }catch(err){
        fs.unlinkSync(tempPath);
        return null;
    }
}
export {uploadOnCloudinary}