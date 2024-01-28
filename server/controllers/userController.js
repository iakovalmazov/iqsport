const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

function generateJwt(id, login, role) {
  return jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

async function registerUser(req, res) {
  const {login, password, role} = req.body
  if(!login || !password) {
    return res.status(400).json({message: 'не введен логин или пароль'})
  }
  const candidate = await User.findOne({where: {login}})
  if(candidate) {
    return res.status(400).json({message: 'такой логин занят'})
  }
  const hashPassword = await bcrypt.hash(password, 5)
  const user = await User.create({login, role, password: hashPassword})
  const token = generateJwt(user.id, user.login, user.role)
  return res.json({token})
}

async function loginUser(req, res) {
  const {login, password} = req.body
  const user = await User.findOne({where: {login}})
  if(!user) {
    return res.status(400).json({message: 'такой пользователь не зарегистрирован'})
  }
  const comparePassword = bcrypt.compareSync(password, user.password)
  if(!comparePassword) {
    return res.status(400).json({message: 'неверный пароль'})
  }
  const token = generateJwt(user.id, user.login, user.role)
  return res.json({token})
}

module.exports = {registerUser, loginUser}