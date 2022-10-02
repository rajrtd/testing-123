const { logEvents } = require('./logger')
// overwrites default express error handling, this is done by making the middleware below
const errorHandler = (err, req, res, next) => { 
    // Calling logEvents function, 
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t$
    {req.headers.origin}`, 'errLog.log')
    console.log(err.stack) // gives lots of detail about error and where it is
    // sees if the response we receive in the parameters already has a status code set
    // if it is set, return the status code, or error 500 which is a server error
    const status = res.statusCode ? res.statusCode : 500

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler