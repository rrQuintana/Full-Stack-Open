import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

function Anecdote({ anecdote, vote }) {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

function AnecdoteList() {
  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' || state.filter === '' || state.filter === undefined) {
      return state.anecdotes.sort((a, b) => b.votes - a.votes);
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
  });
  
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList