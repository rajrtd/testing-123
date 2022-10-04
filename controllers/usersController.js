const User = require('../models/User')
const Note = require('../models/Note') // even though it is the user controller, note may be used
// will keep us from using so many try catch blocks as async methods are used to 
// find, delete, update data from mongoose
const asyncHandler = require('express-async-handler') 
const bcrypt = require('bcrypt') // hashing password before saving it


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async(req, res) => { 
    // Don't return password with user data 
    // .lean() - give us data that is like json and not extra data
    const users = await User.find().select('-password').lean()
    if(!users) {
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async(req, res) => { 
    // when creating new user, we'll receive new info from the frontend, so it needs to be deconstructed
    const { username, password, roles } = req.body

    // Confirming data is set
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required'}) 
        // These are specific responses sent back for specific situations
        // if there is any other error for any other function, it will go to the error handling middleware

        // Check for duplicate
        const duplicate = await User.findOne({ username }).lean().exec()

        if (duplicate) {
            // 409 error means conflict
            return res.status(409).json({message: 'Duplicate username'})
        }

        const hasedPwd = await bcrypt.hash(password, 10) // 10 salt rounds
        const userObject = { username, "password": hashedPwd, roles}

        // Create and store new user
        const user = await User.create(userObject)

        if (user) { // created
            res.status(201).json({ message: `New user ${username} created`})
        } else {
            res.status(400).json({ message: 'Invalid user data received'})
        }

    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async(req, res) => { 
    const { id, username, roles, active, password } = req.body
    
    // confirm data
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required'})        
    }
    
    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    // check for duplicate
    const duplicate = await User.findOne({ username}).lean().exec()
    // Allow updates to the original user
    // id created by mongodb does not equal id in request body 
    if(duplicate && duplicate?._id.toString() !== id) {
        // if ids are same, then not a duplicate, if ids are different then a duplicate
        return res.status(409).json({ message: 'Duplicate username'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password) {
        // hash password
        user.password = await bcrypt.hash(password, 10) // 10 salt rounds
    }
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async(req, res) => { 

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}