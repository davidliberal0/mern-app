const allowedOrigins = require('./allowedOrigins')

// Setup options for cors config
const corsOptions = {
    // Validate if the requests origin is allowed
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    }, 
    // Enable credentials, cookies, and authorization heade r
    credentials: true, 
    optionsSuccessStatus: 200
}

module.exports = corsOptions