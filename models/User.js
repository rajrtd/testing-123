const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // this is an array because of the square braces
    // as an array this indicates that a user may have more than 1 role
    // and more than one role can be stored in the array
    // default value for a user is employee 
    roles: [{
        type: String,
        default: "Employee"
    }],  
    active: {
        type: Boolean,
        default: true
    }
    
})

module.exports = mongoose.model('User', userSchema)