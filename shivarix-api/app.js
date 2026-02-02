import express from 'express'
import contactroute from './src/routes/contact.route.js'
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/contact',contactroute)

export default app