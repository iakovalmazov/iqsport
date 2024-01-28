import React from 'react'
import {Container, Button} from 'react-bootstrap'
import {useNavigate, useLocation, useNavigationType} from 'react-router-dom'
import {GAME_ROUTE} from '../utils/consts'

const Main = ({user, isAuth}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const type = useNavigationType()

  if(!isAuth && !localStorage.getItem('attemptsLeft')) {
    localStorage.setItem('attemptsLeft', 3)
  }

  return (
    <Container className='vh-85'>
      <h1 className='mt-3'>{location.state && type === 'PUSH' ? `ваш результат: ${location.state.result}` : 'приветствую на iqsport'}</h1>
      {!location.state && <h4 className='mt-3'>проверь свои знания о спорте</h4>}
      <Button variant='success' size='lg' className='w-75 h-25 mt-5' onClick={() => navigate(GAME_ROUTE)} disabled={!isAuth && localStorage.getItem('attemptsLeft') === '0'}>
        {location.state ? 'еще раз' : 'начать'}
      </Button>
      {!isAuth && <h6 className='mt-2'>* без авторизации еще не более {localStorage.getItem('attemptsLeft')} попыток</h6>}
    </Container>
  );
};

export default Main;