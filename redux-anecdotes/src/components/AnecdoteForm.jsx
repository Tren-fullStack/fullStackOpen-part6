import { useDispatch } from 'react-redux'
import { postAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    console.log('create new')
  
    let anecdote = (event.target.anecdote.value)
    event.target.anecdote.value = ''

    dispatch(postAnecdote(anecdote))

    dispatch(setNotification(`new anecdote ${anecdote}`, 5))
  }

    return (
    <div>
    <form onSubmit={newAnecdote}>
      <input name='anecdote'/>
      <button type='submit'>create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm

