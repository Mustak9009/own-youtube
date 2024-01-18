import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY  , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
const uploadOnCloudinary = async (locaFilePath)=>{
    try{
        if(!locaFilePath) return {error:'File path does not found...!!!'}
        const res = await cloudinary.uploader.upload(locaFilePath,{resource_type:'auto'});
        console.log("File uploading response: ",res);
        return res;
    }catch(err){
        fs.unlinkSync(locaFilePath);
        console.log(err);
        return null;
    }
}
export {uploadOnCloudinary}