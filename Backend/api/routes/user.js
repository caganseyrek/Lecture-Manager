const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const auth = require('../middleware/isAuth')

router.post('/signup', userController.signup)
router.post('/login', userController.login)

router.post('/logout', auth, userController.logout)

router.patch('/edit', auth, userController.editUser)
router.delete('/delete', auth, userController.deleteUser)

router.post('/resetpw', auth, userController.resetPasswordToken)
router.patch('/resetpw', auth, userController.resetPassword)

module.exports = router