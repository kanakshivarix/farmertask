import express from 'express'
const router=express.Router()
import { createFarm, gettingfarm,updatingfarm,deletingfarm} from '../controllers/admin.controller.js'
import upload from '../middlewares/upload.js'
import protect from '../middlewares/authmiddlware.js'
router.post('/create',protect,upload.single('image'),createFarm)
router.get('/getall',protect,gettingfarm)
router.put('/update/:id',protect,upload.single('image'),updatingfarm)
router.delete('/delete/:id',protect,deletingfarm)
export default router
