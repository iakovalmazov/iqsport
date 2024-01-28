import axios from 'axios' 

const host = axios.create({baseURL: process.env.REACT_APP_API_URL})

export const getRating = async() => {
  const {data} = await host.get('/api/rating')
  return data
}

export const addToRating = async(login = 'аноним', result) => {
  const {data} = await host.post('/api/rating', {login, result})
  return data
}