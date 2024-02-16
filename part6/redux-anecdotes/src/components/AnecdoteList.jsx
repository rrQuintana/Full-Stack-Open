import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createSelector } from "@reduxjs/toolkit";

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

const FilterAnecdotes = createSelector(
  [state => state.filter, state => state.anecdotes],
  (filter, anecdotes) => {
    if (filter === 'ALL' || filter === '' || filter === undefined) {
      return [...anecdotes].sort((a, b) => b?.votes - a?.votes);
    }
    return [...anecdotes].filter(anecdote => anecdote.content.includes(filter));
  }
);

function AnecdoteList() {
  const anecdotes = useSelector(FilterAnecdotes)

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