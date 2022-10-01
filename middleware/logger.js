// { format } - this is destructuring format from the date-fns dependency
const { format } = require('date-fns')
// { v4: uuid } - this is destructuring v4 and renaming it uuid from the uuid dependency 
const { v4 : uuid } = require('uuid')
// fs module for file system - comes from node since it's already built in
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async(message, logFileName) => {
    // These are template literals
    // Whenever a log message is created you are getting the date and time 
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}` // new date is being formatted to meet what's on the right, the 'yyyMMdd\' stuff
    // In the log item, passing in the dateTime just created, and the \t are made so it's easy to import into excel
    // uuid creates a specific id for each log item, and the message
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        // see if directory exists first
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            // if directory doesn't exist, make it
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        // logItem is to log item to the file which is logFileName
        await fsPromises.appendFile((path.join(__dirname, '..', 'logs', logFileName), logItem))
    } catch (err) {
        console.log(err)
    }
}

// The middleware
// middleware has a request, response, and  the ability to call next to move onto the next middleware
const logger = (req, res, next) => {
    // logEvents was created above
    // Origin = where you the request originated from  
    // writing into reqLog.log which is like a text file but for logs, can open like a text file
    // does it for every single request, but can put conditions like only logging if it's not coming from
    // our own url or specific request methods. 
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    // This will show in the log of node.js as running server
    console.log(`${req.method} ${req.path}`)
    next() // to move onto next piece of middleware or eventually the controller where the request would be processed, the logger would come first before those things
}

module.exports = { logEvents, logger } // both are exported, since we might want to use log events inside of an error handler