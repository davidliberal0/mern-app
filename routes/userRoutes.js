const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

// HTTP Methods - CRUD OPERATIONS
// GET : READ
// POST : CREATE
// PATCH : UPDATE
// DELETE : DESTROY

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser) 

module.exports = router