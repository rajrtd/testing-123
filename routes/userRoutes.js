const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
// When you're already at /users and this is the root of it
router.route('/')
    .get(usersController.getAllUsers) // direct to a controller
    .post(usersController.createNewUser) // different controller or response for it
    .patch(usersController.updateUser) // update
    .delete(usersController.deleteUser) 

module.exports = router
