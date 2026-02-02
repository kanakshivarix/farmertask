import User from '../models/user.model.js'
import { loginSchema,registerschema } from '../validation/contact.validation.js'
import asyncHandler from '../middleware/asyncHandler.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generatetoken.js'
import { hashpass,comparepass } from "../utils/password.js";

const register = asyncHandler(async (req, res) => {
    const validatedData=registerschema.parse(req.body)
    const{username,email,password,role}=validatedData
    const exsited = await User.findOne({ email })
    if (exsited) {
        return res.status(400).json({ message: "User already exists" })
    }
    const hashpassed = await hashpass(password)
    const user = await User.create({
        username,
        email,
        password: hashpassed,
        role
    })
   
    const token=generateToken(user)
    const {password:removepass,...withoutpass}=user.toObject()
    return res.status(201).json({
        message: 'user created successfully',
        token,
        user:withoutpass
    })

})
const login = asyncHandler(async (req, res) => {
    const validdata = loginSchema.parse(req.body)
    const { email, password } = validdata
    const user = await User.findOne({email})
    if (!user) {
        return res.status(401).json({
            message: 'user not found'

        })
    }
    const ismatched = await comparepass(password, user.password)
    if (!ismatched) {
        return res.status(401).json({
            message: 'password not matched'
        })
    }
    const token = generateToken(user)
    const { password: removepass, ...withoutpass } = user.toObject()
    return res.status(200).json({
        message: "login successfully",
        user: withoutpass,
        token
    })



})
export {
    register,
    login
}