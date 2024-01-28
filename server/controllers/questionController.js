const {Question} = require('../models/models')

async function getQuestion(req, res) {
  const questionsArray = await Question.findAll()
  const question = questionsArray[Math.floor(Math.random() * questionsArray.length)]
  return res.json(question)
}

async function getAllQuestions(req, res) {
  const questions = await Question.findAll()
  return res.json(questions)
}

async function addQuestion(req, res) {
  const {title, correct, answers} = req.body
  const question = await Question.create({title, correct, answers})
  return res.json(question)
}

async function removeQuestion(req, res) {
  const {id} = req.body
  await Question.destroy({where: {id}})
  const questions = await Question.findAll()
  return res.json(questions)
}

async function editQuestion(req, res) {
  const {id, title, correct, answers} = req.body
  const question = await Question.findOne({where: {id}})
  question.set({title, correct, answers})
  await question.save()
  const questions = await Question.findAll()
  return res.json(questions)
}

module.exports = {getQuestion, getAllQuestions, addQuestion, removeQuestion, editQuestion}