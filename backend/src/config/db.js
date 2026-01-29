import mongoose from 'mongoose'
import env from './env.config.js'
const connectdb=async()=>{
    try{
        const connectionin=await mongoose.connect(`${env.MONGODB_URI}/${env.DB_NAME}`)
        console.log(`database connected ${connectionin.connection.host}`)
    }
    catch(error)
    {
    console.log(`database not connected ${error}`)
    }
}
export default connectdb