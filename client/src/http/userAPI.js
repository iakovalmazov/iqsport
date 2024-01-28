import axios from 'axios' 
import {jwtDecode} from 'jwt-decode'

const host = axios.create({baseURL: process.env.REACT_APP_API_URL})

export const registration = async (login, password) => {
  const {data} = await host.post('/api/user/register', {login, password})
  return jwtDecode(data.token)
}

export const login = async (login, password) => {
  const {data} = await host.post('/api/user/login', {login, password})
  return jwtDecode(data.token)
}


