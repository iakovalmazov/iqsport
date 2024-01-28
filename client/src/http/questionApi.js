import axios from 'axios' 

const host = axios.create({baseURL: process.env.REACT_APP_API_URL})

export const getQuestion = async() => {
  const {data} = await host.get('/api/question')
  return data
}

export const getAllQuestions = async() => {
  const {data} = await host.get('/api/question/all')
  return data
}

export const addQuestion = async(title, correct, answers) => {
  const {data} = await host.post('/api/question/add', {title, correct, answers})
  return data
}

export const removeQuestion = async(id) => {
  const {data} = await host.post('/api/question/remove', {id})
  return data
}

export const editQuestion = async(id, title, correct, answers) => {
  const {data} = await host.post('/api/question/edit', {id, title, correct, answers})
  return data
}