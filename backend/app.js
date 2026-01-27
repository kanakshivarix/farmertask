import express from 'express'
import authroute from './src/routes/auth.route.js'
import adminroute from './src/routes/admin.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', authroute)
app.use('/api',adminroute)


export default app
