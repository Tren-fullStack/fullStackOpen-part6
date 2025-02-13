import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const sendAnecdote = async(request) => {
    console.log('request:', request)
    try {
        const response = await axios.post(baseUrl, request)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const updateVote = async(request) => {
    const response = await axios.put(`${baseUrl}/${request.id}`, request)
    return response.data
}
