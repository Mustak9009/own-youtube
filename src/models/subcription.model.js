import mongoose from 'mongoose';

const subcriptionSchema = new mongoose.Schema({
    subscriber:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    channer:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},{timestamps:true});

export const Subcription = mongoose.model("Subcription",subcriptionSchema);