const allowedOrigins = require('./allowedOrigins') 
// since it's 3rd party middleware, we have to follow their rules
const corsOptions = {
    origin: (origin, callback) => {
        // limits only those in the array can access our backend rest api, but we want postman and other desktop apps
        if (allowedOrigins.indexOf(origin) !== -1 || !origin)
            // first argument of callback is an error object
            // second is the allowed boolean, since it is successful, we'll say true
            callback(null, true)
        else    
            callback(new Error('not allowed by CORS'))
    },
    // This sets the access control allow credentials header
    credentials: true, 
    optionsSuccessStatus: 200 // default is 204, but 200 is acceptable by every device
}

module.exports = corsOptions