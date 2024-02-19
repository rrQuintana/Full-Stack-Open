import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  const result = useQuery('anecdotes', getAnecdotes, { retry: false })
  const anecdotes = result.data

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = anecdotes.map(anecdote =>
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
      )
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
  }

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes?.map(anecdote =>
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
