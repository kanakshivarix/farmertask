import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import env from '../config/env.config.js'
const createAdmin=async(req,res)=>{
    try{
     const adminexist=await User.findOne({
        email:env.ADMIN_EMAIL
     })
     if(!adminexist)
     {
        const haspass=await bcrypt.hash(env.ADMIN_PASS,10)
        await User.create({
            username:env.ADMIN_USERNAME,
            email:env.ADMIN_EMAIL,
            password:haspass,
            role:'Admin'
        })
        console.log(`admin created successfully`)
     }
     else{
      console.log('admin already exists')  
     }
    }
    
    catch(error)
    {
    console.log(`error ${error}`)
    }
}
export default createAdmin
