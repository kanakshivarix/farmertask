import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const register = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All feilds required' })
    }
    const exsited = await User.findOne({ email })
    if (exsited) {
        return res.status(400).json({ message: "User already exists" })
    }
    const hashpass = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashpass,
        role
    })
    const token=jwt.sign({id:user._id,role:user.role,email:user.email},process.env.JWTSECRET,{
        expiresIn:'7d'
    })
    const {password:removepass,...withoutpass}=user.toObject()
    return res.status(201).json({
        message: 'user created successfully',
        token,
        user:withoutpass
    })

})
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "All feilds required"
        })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: 'user not found'
        })
    }
    const ismatched = await bcrypt.compare(password, user.password)
    if (!ismatched) {
        return res.status(400).json({
            message: "Password it not matched"
        })
    }
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWTSECRET, {
        expiresIn: "7d"

    })
    const {password:remove,...withoutpass}=user.toObject()
    return res.status(200).json({
        message: 'login successfully',
        token,
        user:withoutpass
       
    })

})
export { register, login }