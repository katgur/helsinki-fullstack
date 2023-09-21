import axios from 'axios'
const baseUrl = `http://localhost:3003/api/blogs`
import { USER_KEY } from '../App'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

export default { getAll, setToken }