import jwt from 'jsonwebtoken'
const generateToken=(user)=>{
    return jwt.sign({id:user.id,email:user.email,role:user.role},process.env.JWTSECRET,{
        expiresIn:"7d"
    })
} 
export default generateToken