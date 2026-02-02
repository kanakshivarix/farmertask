import express from 'express'
const router=express.Router()
import { createContact,getcontact } from '../controllers/contact.controller.js'
import { protect,authorize } from '../middleware/authmiddleware.js'
router.post('/create',protect,authorize('Admin'),createContact)
router.get('/getall',protect,authorize('Admin'),getcontact)
export default router