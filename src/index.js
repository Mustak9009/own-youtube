import 'dotenv/config'
import {connectDB} from './db/index.js';
import {app} from './app.js';
connectDB().then(()=>{
    app.on('error',(err)=>{
        console.error("Express error: ",err);
        throw err;
    });
    app.listen(process.env.PORT,()=>{
        console.log('Server run at http://localhost:'+process.env.PORT);
    })
}).catch((err)=>{
    console.log('MongoDB Connection FAILD: ',err);
})












/*import mongoose from 'mongoose';
import {DB_NAME} from './constants.js';
import express from 'express';
const app = express();
(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error',(err)=>{
            console.error("Error: ",err);
            throw err;
        });
        app.listen(process.env.PORT,()=>{
            console.log("Server run at: http://localhost:"+process.env.PORT);
        })
    }catch(err){
        console.error('Error: ',err);
        throw err;
    }
})()*/