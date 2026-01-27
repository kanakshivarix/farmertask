import mongoose from 'mongoose'
import User from './user.model.js'
const farmSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    landSize: {
        type: Number
    },
    assignedFarm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    price:{
        type:Number
    },
    image: {
        type: String //meta data 
    }
}, {
    timestamps: true
})
const Farm = mongoose.model('farm', farmSchema)
export default Farm