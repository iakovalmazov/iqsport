import React from 'react';
import {Container, Nav, Navbar, Button} from 'react-bootstrap'
import {MAIN_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, GAME_ROUTE} from '../utils/consts'
import {useNavigate, useLocation} from 'react-router-dom'

const NavBar = ({user, setUser, isAuth, setIsAuth}) => {
  const navigate = useNavigate()
  const location = useLocation()

  function exit() {
    setIsAuth(false)
    localStorage.removeItem('user')
    localStorage.removeItem('isAuth')
    navigate(MAIN_ROUTE)
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href={MAIN_ROUTE}>iqsport</Navbar.Brand>
        {isAuth ?
          <Nav className="ms-auto">
            <Navbar.Text className='me-2 text-light'>{user.login || user}</Navbar.Text>
            {user.role === 'admin' && <Button variant='success' className='me-2' onClick={() => navigate(ADMIN_ROUTE)}>админ панель</Button>}
            <Button variant='danger' onClick={exit}>выйти</Button>
          </Nav>
          :
          <Nav className="ms-auto">
            {location.pathname === GAME_ROUTE && <Navbar.Text className='me-2 text-light'>{user.login || user}</Navbar.Text>}
            <Button variant='success' className='me-2' onClick={() => navigate(LOGIN_ROUTE)}>войти</Button>
        </Nav>
        }
      </Container>
    </Navbar>
  );
}

export default NavBar;