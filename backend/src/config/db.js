import mongoose from 'mongoose'
const connectdb=async()=>{
    try{
        const connectionin=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`database connected ${connectionin.connection.host}`)
    }
    catch(error)
    {
    console.log(`database not connected ${error}`)
    }
}
export default connectdb