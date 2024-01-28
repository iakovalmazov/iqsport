import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import {Container, Card, Form, Tab, Tabs, Button} from 'react-bootstrap'
import {REGISTER_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from '../utils/consts'
import { registration, login } from '../http/userAPI';

const Auth = ({user, setUser, isAuth, setIsAuth}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [key, setKey] = useState(location.pathname)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [mistake, setMistake] = useState('')
  const isLogin = location.pathname === '/login'

  function changeRoute(route) {
    const nextRoute = route
    setKey(route)
    if(nextRoute !== location.pathname) {
      nextRoute === '/register' ? navigate(REGISTER_ROUTE) : navigate(LOGIN_ROUTE)
    }
  }

  async function enter() {
    try {
      let response
      if(isLogin) {
        response = await login(name, password)
      } else {
        response = await registration(name, password)
      }
      setUser(response)
      setIsAuth(true)
      localStorage.setItem('user', JSON.stringify(response))
      localStorage.setItem('isAuth', true)
      setMistake('')
      navigate(MAIN_ROUTE)
    } catch(e) {
      setMistake(e.response.data.message)
    }
  }
  
  return (
    <Container className='vh-85 w-50'>
      {mistake && <Card body border='danger' className='mt-2'>{mistake}</Card>}
      <Tabs activeKey={key} onSelect={k => changeRoute(k)} className='mt-2' fill>
        <Tab eventKey='/register' title='регистрация'>
          <Card className='p-5'>
            <h2>регистрация</h2>
            <Form className='d-flex flex-column'>
              <Form.Control className='mt-2' placeholder='логин' value={name} onChange={e => setName(e.target.value)}/>
              <Form.Control className='mt-2' type='password' placeholder='пароль' value={password} onChange={(e => setPassword(e.target.value))}/>
              <Button variant='success' className='mt-2 align-self-end' onClick={enter}>регистрация</Button>
            </Form>
          </Card>
        </Tab>
        <Tab eventKey='/login' title='войти'>
          <Card className='p-5'>
            <h2>войти</h2>
            <Form className='d-flex flex-column'>
              <Form.Control className='mt-2' placeholder='логин' value={name} onChange={e => setName(e.target.value)}/>
              <Form.Control className='mt-2' type='password' placeholder='пароль' value={password} onChange={e => setPassword(e.target.value)}/>
              <Button variant='success' className='mt-2 align-self-end' onClick={enter}>войти</Button>
            </Form>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Auth;