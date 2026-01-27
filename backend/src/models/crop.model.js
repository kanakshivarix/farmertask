import mongoose from "mongoose";
import Farm from "./farm.model.js";
const cropSchema=new mongoose.Schema({
    farm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Farm'
    },
    name:{
        type:String,

    },
    stage:{
        type:String,
        enum:['Sowing', 'Growing', 'Harvest Ready', 'Harvested'],

    }

},{
    timestamps:true
})
const Crop=mongoose.model('Crop',cropSchema)
export default Crop