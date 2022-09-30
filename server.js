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
// the '/' is usually the root or index of a web page.
// __dirname is a global variable that node.js understands and it says look inside of the folder we're in
// then look inside the public folder.
// we're telling express where to find static files like a css file or image 
app.use('/', express.static(path.join(__dirname, '/public')))

// () is a function and => is saying within this function do this.
// A template literal is what is within the console.log function.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))