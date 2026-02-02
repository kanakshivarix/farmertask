import express from 'express'
import contactroute from './src/routes/contact.route.js'
import adminroute from './src/routes/auth.route.js'
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/admin',adminroute)
app.use('/api/contact',contactroute)

export default app