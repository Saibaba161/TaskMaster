require('dotenv').config()

const express = require('express')
const notesRoutes = require('./routes/notes')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

//express app
const app = express()

//middleware
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/notes', notesRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests
        app.listen(process.env.PORT, () => {
        console.log('Connected to db & Listening to port',process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })