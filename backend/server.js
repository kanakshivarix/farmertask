import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import connectdb from './src/config/db.js'
import createadmin from './src/seed/createAdmin.js'
import cloudinary from './src/config/cloudinary.js'
import logger from './src/utils/logger.js'

const startServer = async () => {
  try {
    await connectdb()          
      app.listen(process.env.PORT || 3300,() => {
      logger.info(`Server connected on port ${process.env.PORT}`)
      console.log(`server connected ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(`server not connected ${error}`)
  }
}

startServer()
