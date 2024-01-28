import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Game from "./pages/Game"
import Main from "./pages/Main"
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, GAME_ROUTE, MAIN_ROUTE} from './utils/consts'

export const authRoute = {
  path: ADMIN_ROUTE,
  Element: Admin
}

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Element: Auth
  },
  {
    path: REGISTER_ROUTE,
    Element: Auth
  },
  {
    path: GAME_ROUTE,
    Element: Game
  },
  {
    path: MAIN_ROUTE,
    Element: Main
  }
]