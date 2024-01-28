const Router = require('express')
const router = new Router()
const {getRating, addToRating} = require('../controllers/ratingController')

router.get('/', getRating)
router.post('/', addToRating)

module.exports = router