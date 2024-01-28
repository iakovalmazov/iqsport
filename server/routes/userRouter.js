const Router = require('express')
const router = new Router()
const {registerUser, loginUser} = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router