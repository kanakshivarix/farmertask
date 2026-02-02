import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import connectdb from './src/config/db.js'
import env from './src/config/env.config.js'
import createAdmin from './src/seed/seedAdmin.js'
const startServer=async()=>{
    try{
        await connectdb()
        createAdmin()
        app.listen(env.PORT,()=>{
            console.log(`server connected to ${env.PORT}`)
        })

    }
    catch(error)
    {
    console.log('server not connected')
    }

}
startServer()