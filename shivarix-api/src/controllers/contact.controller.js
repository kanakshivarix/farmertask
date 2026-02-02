import asyncHandler from "../middleware/asyncHandler.js";
import Contact from "../models/contact.model.js";
import { createcontactschmea } from "../validation/contact.validation.js";
const createContact=asyncHandler(async(req,res)=>{
    const validata=createcontactschmea.parse(req.body)
    const{fullname,email,phone,company,service,projectDetails}=validata
    const contact=await Contact.create({
        fullname,
        email,
        phone,
        company,
        service,
        projectDetails
     })
     return res.status(201).json({
        message:'form created successfully',
        contact
     })
    

}) 
const getcontact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find()
    if(!contacts)
    {
        return res.status(401).json({
            message:"no contacts exists"
        })
    }
    return res.status(200).json({
        message:"all contacts",
        contacts
    })
})

export {
    createContact,
    getcontact
}