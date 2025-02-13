import { useSelector, useDispatch } from 'react-redux'
import { putVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  if(filter) {
    // check which anecdotes contain the chars in filter
    anecdotes = anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  }

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(putVote(id, anecdotes))

    dispatch(setNotification(`you voted for ${content}`, 3))
  }

  return (
  <div>  
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
        </div>
    )}
  </div>
  )
}

export default AnecdoteList