import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    resetToken: {
        type: String,
    },
    resetTokenExpires: {
        type: String
    },
    role: {
        type: String,
        enum: ['Farmer', 'Admin', 'User'],
        default: 'User'

    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    state:{
        type:String
    }
}, {
    timestamps: true

})
const User = mongoose.model('User', userSchema)
export default User