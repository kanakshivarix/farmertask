import express from 'express'
import authroute from './src/routes/auth.route.js'
import adminroute from './src/routes/admin.route.js'
import errorHandler from './src/middlewares/errorHandler.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', authroute)
app.use('/api',adminroute)
app.use(errorHandler); 


export default app
