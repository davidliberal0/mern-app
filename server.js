require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express() 
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500 // server deployment port 

console.log(process.env.DATABASE_URI)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

// middleware for processing json 
app.use(express.json())

app.use(cookieParser())

// Allows Express to serve static files
// Serve files such as HTML, CSS, JS, etc. 
app.use('/', express.static(path.join(__dirname, '/public')))

// This line moutns the 'root' route handler from the module
// requests to the root URL will be handled by the routes defined 
// in the 'root' module
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

// Handle all unmatched requests and return a 404 error - when 
// incoming requests dont match any defined routes 
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// errorhandler 
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})