import axios from 'axios'
const baseUrl = `http://localhost:3003/api/blogs`

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

const add = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, data, config)
  return request.then(response => response.data)
}

const update = (id, data) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, data, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, add, setToken, update, remove }