import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit";
import Notification from "./Notification";
import { notificate } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(notificate(`You voted for '${anecdote.content}'`));
  };

  return (
    <div>
      <Notification />
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList