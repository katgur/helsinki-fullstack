import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const add = async (content) => {
    const response = await axios.post(baseUrl, { content, votes: 0 })
    return response.data
}

const edit = async (id, anecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, { content: anecdote.content, votes: anecdote.votes })
    return response.data
}

export default { getAll, add, edit }