import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm.JSX'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes.service'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => {
      dispatch(setAnecdotes(anecdotes));
    });
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App