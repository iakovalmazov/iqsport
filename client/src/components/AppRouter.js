import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoute, publicRoutes} from '../routes'
import { MAIN_ROUTE } from '../utils/consts'

const AppRouter = ({user, setUser, isAuth, setIsAuth, setRating}) => {
  return (
    <Routes>
      {user.role === 'admin' && <Route path={authRoute.path} element={<authRoute.Element user={user} setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>}
      {publicRoutes.map(({path, Element}) => 
        <Route key={path} path={path} element={<Element user={user} setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth} setRating={setRating}/>}/>
      )}
      <Route path='*' element={<Navigate to={MAIN_ROUTE} user={user} setUser={setUser} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
    </Routes>
  );
};

export default AppRouter;