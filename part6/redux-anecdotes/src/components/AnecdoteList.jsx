import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { createSelector } from "@reduxjs/toolkit";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";

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

  console.log('anecdotes:', anecdotes);

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteAnecdote(anecdote.id));

    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
    dispatch(setNotification(`You voted for '${anecdote.content}'`));
    
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