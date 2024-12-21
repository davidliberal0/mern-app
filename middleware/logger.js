const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

// function to log events async
const logEvents = async (MessageChannel, logFileName) => {
    // get current date and time 
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    //create a log item with timestamp, ID, and message
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        // check if log directory exists, if not create it
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }

        // append log item to the log file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err) // catch any errors
    }

}

// middleware logger function to log requests 
const logger = (req, res, next) => {
    // log request method, url, and origin to reqLog.log
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    // log http method and path of request 
    console.log(`${req.method} ${req.path}`)
    // call next middleware function in the stack 
    next()
} 

module.exports = { logEvents, logger }