import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registerschema,loginSchema } from "../validation/user.validation.js";
import generateToken from "../utils/generateToken.js";
import { hashpass,comparepass } from "../utils/password.js";
import sendMail from "../utils/sendEmail.js";
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
    const validatedData=loginSchema.parse(req.body)
    const{email,password}=validatedData
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: 'user not found'
        })
    }
    const ismatched = await comparepass(password, user.password)
    if (!ismatched) {
        return res.status(400).json({
            message: "Password it not matched"
        })
    }
     await sendMail({
        to:email,
        subject:'welcome to our app',
        template:'welcome',
        data:{
            username:user.username
        },
        text:"you login successfully"
    })
    const token = generateToken(user)
    const {password:remove,...withoutpass}=user.toObject()
    return res.status(200).json({
        message: 'login successfully',
        token,
        user:withoutpass
       
    })

})

export { register, login }