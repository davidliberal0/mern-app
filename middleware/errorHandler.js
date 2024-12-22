const {logEvents } = require('./logger')

/**
 * Error handling middleware for logging and sending error responses.
 * @param {Error} err - The error object passed by Express when an error occurs.
 * @param {Object} req - The incoming HTTP request object.
 * @param {Object} res - The outgoing HTTP response object.
 * @param {Function} next - The next middleware function in the stack (not used here).
 */

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')

    // log full error stack to console for debugging purposes 
    console.log(err.stack)
    
    const status = res.statusCode ? res.statusCode : 500 // server error

    // set the http status code for the response 
    res.status(status)

    // send the json error message (goes to the client)
    // error message will be included in the msaage field of the reponse body
    res.json({ message: err.message })
}

module.exports = errorHandler