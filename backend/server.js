import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import connectdb from './src/config/db.js'
import createadmin from './src/seed/createAdmin.js'

const startServer = async () => {
  try {
    await connectdb()          
      app.listen(process.env.PORT || 3300,() => {
      console.log(`Server connected on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(`server not connected ${error}`)
  }
}

startServer()
