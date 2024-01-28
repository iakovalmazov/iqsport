const {Rating} = require('../models/models')

async function getRating(req, res) {
  const rating = await Rating.findAll()
  rating.sort((a, b) => b.result - a.result)
  rating.length = 10
  return res.json(rating)
}

async function addToRating(req, res) {
  const {login, result} = req.body
  const rating = await Rating.create({login, result})
  const newRating = await Rating.findAll()
  newRating.sort((a, b) => b.result - a.result)
  newRating.length = 10
  return res.json(newRating)
}

module.exports = {getRating, addToRating}