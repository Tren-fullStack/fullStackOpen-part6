import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAll, updateVote } from './services/anecdoteService'

const App = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({ 
    mutationFn: updateVote,
    onSuccess: (anecdoteUpvoted) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      const index = anecdotes.findIndex(anecdote => anecdote.id === anecdoteUpvoted.id)
      const filterAnecdotes = anecdotes.filter(anecdote => anecdote.id !== anecdoteUpvoted.id)
      const newAnecdotes = filterAnecdotes.toSpliced(index, 0, anecdoteUpvoted)

      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    }
  })

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  JSON.parse(JSON.stringify(query))

  if ( query.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = query.data
  
  const handleVote = (anecdote) => {
    console.log('vote')
    mutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
