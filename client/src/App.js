import React, {useState, useEffect} from 'react'
import { BrowserRouter } from "react-router-dom"
import './styles/App.css'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import {Row, Col, Container} from 'react-bootstrap'
import Rating from './components/Rating'
import { getRating } from './http/ratingApi'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || 'аноним')
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('isAuth')))
  const [rating, setRating] = useState([])

  useEffect(() => {
    getRating().then(data => setRating(data))
  }, [])

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Container>
        <Row className='mt-4'>
          <Col md={9}><AppRouter user={user} setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth} setRating={setRating}/></Col>
          <Col md={3}><Rating rating={rating}/></Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
