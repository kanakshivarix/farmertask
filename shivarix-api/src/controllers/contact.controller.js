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
const getcontact = asyncHandler(async (req, res) => {
  // Query params
  const page = parseInt(req.query.page) || 1          // default page 1
  const limit = parseInt(req.query.limit) || 10       // default 10 items per page
  const search = req.query.search || ""              // search by fullname, email, company
  const service = req.query.service || ""            // filter by service

  // Build filter
  let filter = {}
  if (search) {
    filter.$or = [
      { fullname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ]
  }
  if (service) {
    filter.service = service
  }

  // Pagination
  const skip = (page - 1) * limit

  const total = await Contact.countDocuments(filter)
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(limit)

  if (!contacts || contacts.length === 0) {
    return res.status(404).json({
      message: "No contacts found",
    })
  }

  return res.status(200).json({
    message: "Contacts fetched successfully",
    total,
    page,
    pages: Math.ceil(total / limit),
    contacts,
  })
})


export {
    createContact,
    getcontact
}