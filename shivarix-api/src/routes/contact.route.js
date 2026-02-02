import express from 'express'
const router=express.Router()
import { createContact,getcontact } from '../controllers/contact.controller.js'
router.post('/create',createContact)
router.get('/getall',getcontact)
export default router