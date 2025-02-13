import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async() => {
    let response = await axios.get(baseUrl)
    return response.data
}

const addAnecdote = async(request) => {
  console.log('anecdote to add', request)
  try {
    let response = await axios.post(baseUrl, request)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

const updateVote = async(id, anecdoteToUpvote) => {
  try {
    let response = await axios.put(`${baseUrl}/${id}`, anecdoteToUpvote)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default { getAnecdotes, addAnecdote, updateVote } 