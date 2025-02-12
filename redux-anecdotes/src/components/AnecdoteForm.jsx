import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    console.log('create new')
  
    let anecdote = (event.target.anecdote.value)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
  }

    return (
    <div>
    <h2>create new</h2>    
    <form onSubmit={newAnecdote}>
      <input name='anecdote'/>
      <button type='submit'>create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm

