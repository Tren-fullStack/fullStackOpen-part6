import { createSlice, current } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  console.log(anecdote)
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice ({
  name: 'anecdote',
  initialState: [],
  reducers: {
    increment(state, action) {
      let id = action.payload
      let newState = state.map(anecdote => 
        anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1}: anecdote
      )
      return newState.sort((a,b) => b.votes - a.votes)
    },
    create (state, action) {
      let newAnecdote = action.payload
      state.push(newAnecdote) 
    },
    setInitial(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { increment, create, setInitial } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async(dispatch) => {  
    const initialAnecdotes = await anecdotesService.getAnecdotes()
    dispatch(setInitial(initialAnecdotes))
  }
}

export const postAnecdote = (anecdote) => {
  return async(dispatch) => {
    let objAnecdote = asObject(anecdote)
    let data = await anecdotesService.addAnecdote(objAnecdote)

    dispatch(create(data))
  }
}

export const putVote = (id, anecdotes) => {
  let anecdoteToUpvote = anecdotes.find(anecdote => anecdote.id === id)
  console.log('before upvote', anecdoteToUpvote.votes)
  anecdoteToUpvote = {
    ...anecdoteToUpvote,
    votes: anecdoteToUpvote.votes + 1
  }
  return async(dispatch) => {
    let data = await anecdotesService.updateVote(id, anecdoteToUpvote)

    dispatch(increment(data.id))
  }
}

export default anecdoteSlice.reducer
