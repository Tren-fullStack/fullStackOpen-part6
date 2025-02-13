import { useQueryClient } from '@tanstack/react-query' 
import { useMutation } from '@tanstack/react-query'
import { sendAnecdote } from '../services/anecdoteService'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({ 
    mutationFn: sendAnecdote,
    onSuccess: (newAnecdote) => {
      // data before post
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      // data after post
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    } 
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()  
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    mutation.mutate({ content:content, id: getId(), votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
