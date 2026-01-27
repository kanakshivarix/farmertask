import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
const createadmin=async(req,res)=>{
    try{
     const adminexist=await User.findOne({role:'Admin'})
     if(!adminexist)
     {
      const haspass=await bcrypt.hash(process.env.ADMIN_PASS,10)
      await User.create({
        username:process.env.ADMIN_USERNAME,
        email:process.env.ADMIN_EMAIL,
        password:haspass,
      })
       console.log(`admin created successfuly`)
     }
    
     else{
        console.log(`Admin already exists`)
     }
    }
    catch(error)
    {
     console.log(`admin creation error ${error}`)
    }
}
export default createadmin