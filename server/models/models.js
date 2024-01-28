const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  login: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.STRING, defaultValue: 'user'}
})

const Question = sequelize.define('question', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  correct: {type: DataTypes.STRING, allowNull: false},
  answers: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('answers').split(',')
    },
    set(val) {
      this.setDataValue('answers', val.join(','))
    }
  }
})

const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  login: {type: DataTypes.STRING, allowNull: false},
  result: {type: DataTypes.INTEGER, allowNull: false}
})

module.exports = {User, Question, Rating}