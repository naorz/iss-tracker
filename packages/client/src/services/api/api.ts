import axios from 'axios'

const token = 'my_token'
const baseURL = 'http://localhost:3000'

export const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
