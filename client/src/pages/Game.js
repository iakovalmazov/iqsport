import React, {useEffect, useState} from 'react';
import { ListGroup, Badge } from 'react-bootstrap'
import {useNavigate, useNavigationType} from 'react-router-dom'
import { MAIN_ROUTE } from '../utils/consts'
import Question from '../components/Question'
import {addToRating} from '../http/ratingApi'

const Game = ({user, setUser, isAuth, setIsAuth, setRating}) => {
  const navigate = useNavigate()
  const type = useNavigationType()
  const [timeLeft, setTimeLeft] = useState(type === 'PUSH' ? 30 : localStorage.getItem('timeLeft') - 1)
  const [mistakesCanMake, setMistakesCanMake] = useState(type === 'PUSH' ? 2 : localStorage.getItem('mistakesCanMake'))
  const [questionNumber, setQuestionNumber] = useState(type === 'PUSH' ? 0 : localStorage.getItem('questionNumber'))

  function tickTimer() {
    if(+timeLeft === 0) {
      if(+mistakesCanMake === 0) {
        localStorage.setItem('mistakesCanMake', 2)
        localStorage.setItem('questionNumber', 0)
        if(!isAuth) {
          localStorage.setItem('attemptsLeft', localStorage.getItem('attemptsLeft') - 1)
        }
        addToRating(user.login, questionNumber).then(data => setRating(data))
        navigate(MAIN_ROUTE, {state: {result: questionNumber}})
      } else {
        const newMistakesCanMake = mistakesCanMake - 1
        localStorage.setItem('mistakesCanMake', newMistakesCanMake)
        localStorage.setItem('timeLeft', timeLeft)
        setMistakesCanMake(newMistakesCanMake)
        setTimeLeft(30)
      }
    } else {
      const newTimeLeft = timeLeft - 1
      localStorage.setItem('timeLeft', newTimeLeft)
      setTimeLeft(newTimeLeft)
    }
  }

  function checkAnswer(answer, correct) {
    if(answer === correct) {
      const newQuestionNumber = +questionNumber + 1
      localStorage.setItem('questionNumber', newQuestionNumber)
      setQuestionNumber(newQuestionNumber)
      setTimeLeft(30)
    } else {
      if(+mistakesCanMake === 0) {
        localStorage.setItem('mistakesCanMake', 2)
        localStorage.setItem('questionNumber', 0)
        if(!isAuth) {
          localStorage.setItem('attemptsLeft', localStorage.getItem('attemptsLeft') - 1)
        }
        addToRating(user.login, questionNumber).then(data => setRating(data))
        navigate(MAIN_ROUTE, {state: {result: questionNumber}})
      } else {
        const newMistakesCanMake = mistakesCanMake - 1
        localStorage.setItem('mistakesCanMake', newMistakesCanMake)
        setMistakesCanMake(newMistakesCanMake)
        setTimeLeft(30)
      }
    }
  }

  useEffect(() => {
    const timerId = setInterval(() => tickTimer(), 1000)
    return () => clearInterval(timerId)
  })

  return (
    <div className='d-flex flex-column mt-3'>
      <ListGroup horizontal className='d-flex mt-3'>
        <ListGroup.Item className='flex-fill text-center'>
          Верных ответов: 
          <Badge bg='success' pill className='ms-2'>
            {questionNumber}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item className='flex-fill text-center'>
          Времени осталось: 
          <Badge bg={timeLeft > 20 ? 'success' : timeLeft > 10 ? 'warning' : 'danger'} pill className='ms-2'>
            {timeLeft}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item className='flex-fill text-center'>
          Возможных ошибок: 
          <Badge bg={+mistakesCanMake === 2 ? 'success' : +mistakesCanMake === 1 ? 'warning' : 'danger'} pill className='ms-2'>
            {mistakesCanMake}
          </Badge>
        </ListGroup.Item>
      </ListGroup>
      <Question checkAnswer={checkAnswer} mistakesCanMake={mistakesCanMake} questionNumber={questionNumber}/>
    </div>
  );
};

export default Game;