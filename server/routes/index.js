const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const questionRouter = require('./questionRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/question', questionRouter)
router.use('/rating', ratingRouter)

module.exports = router