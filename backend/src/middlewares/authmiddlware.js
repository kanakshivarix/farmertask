import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
const protect=async(req,res,next)=>{
    let token;
    if( 
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    )
    {
        try{
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWTSECRET)
            req.user=await User.findById(decoded.id).select('-password')
            if(!req.user)
            {
                return res.status(400).json({
                    message:"user not found"
                })
            }
            return next()

        }
        catch(error)
        {
        return res.status(400).json({
            message:"invalid token"
        })
        }
    }
    return res.status(500).json({
        message:'unauthorized access invalid token'
    })
}
export default protect