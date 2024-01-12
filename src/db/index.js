import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';
export const connectDB = async ()=>{
    try{
        const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected...!! DB HOST: ${connectionInstance.connection.host}`);
        
    }catch(err){
        console.error('MongoDB Connection FAILD: ',err);
        process.exit(1);
    }
}