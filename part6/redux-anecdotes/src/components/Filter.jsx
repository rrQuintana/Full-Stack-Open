import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    dispatch(filterChange(content))
  }

  return (
    <div style={{marginBottom: 10}}>
      filter by likes number <input onChange={handleChange} />
    </div>
  )
}

export default Filter