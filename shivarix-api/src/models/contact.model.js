import mongoose from "mongoose";
const contactSchema=new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String},
    company:{type:String},
    service:{type:String,required:true},
    projectDetails:{type:String},

},
{timestamps:true})
const Contact=mongoose.model("Contact",contactSchema)
export default Contact