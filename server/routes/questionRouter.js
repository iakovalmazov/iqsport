const Router = require('express')
const router = new Router()
const {getQuestion, getAllQuestions, addQuestion, removeQuestion, editQuestion} = require('../controllers/questionController')

router.get('/', getQuestion)
router.get('/all', getAllQuestions)
router.post('/add', addQuestion)
router.post('/remove', removeQuestion)
router.post('/edit', editQuestion)

module.exports =  router