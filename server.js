const express = require('express')
const app = express()
// import path from node.js service
const path = require('path')
// This helps set what port the server 
// runs on in development and when it is deployed somewhere.
// process.env.PORT - if the place it is deployed has a port number saved 
// in the environment variable, 
// otherwise run it locally at PORT 3500
const PORT = process.env.PORT || 3500

app.use(express.json())
// the '/' is usually the root or index of a web page.
// __dirname is a global variable that node.js understands and it says look inside of the folder we're in
// then look inside the public folder.
// we're telling express where to find static files like a css file or image 
// express.static is built-in middleware, it tells the server where to grab static files.
app.use('/', express.static(path.join(__dirname, '/public'))) // you don't have to use the forward slash

// looking for a routes folder then a root file.
app.use('/', require('./routes/root'))

// instead of app.use so it listens for the astrix which basically means 'all' which is routed to this instead of anything else.
app.all('*', (req, res) => {
    res.status(404)
    // Headers from the request that comes in
    // different responses for different types of requests
    if(req.accepts('html'))
        res.sendFile(path.join(__dirname, '/views', '404.html'))
    else if (req.accepts('json'))
        res.json({message: '404 Not Found'})
    else
        res.type('txt').send('404 Not Found')
})

// () is a function and => is saying within this function do this.
// A template literal is what is within the console.log function.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


//css folder is made in public folder

// normally with REST API we're just gonna be receiving requests and sending back json data when requested
// however a rest api can still have a splash page and return information about requests that cannot be fulfilled