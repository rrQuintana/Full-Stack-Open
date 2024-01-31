import { useEffect, useState } from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberService from './services/numbers'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleChangeName = e => setNewName(e.target.value)
  const handleChangeNumber = e => setNumber(e.target.value)
  const handleChangeFilter = e => setFilter(e.target.value)

  const messageHandler = (type, message) => {
    const handler = type === 'success' ? setSuccessMessage : setErrorMessage

    handler(message)

    setTimeout(() => {
      handler(null)
    } , 5000)
  }

  const addNumber = (newNumber) => {
    numberService.create(newNumber).then(returnedNumber => {
      setPersons([...persons, returnedNumber])
      messageHandler("success", `Added ${returnedNumber.name}`)
    }).catch(error => {
      messageHandler("error", error.response.data.error)
    })
  }

  const updateNumber = (id, newNumber) => {
    numberService.update(id, newNumber).then(updatedNumber => {
      setPersons(persons.map(person => person.id !== id ? person : updatedNumber))
      messageHandler("success", `Updated ${updatedNumber.name}`)
    }).catch(() => {
      messageHandler("error", `Information of ${newNumber.name} has already been removed from server`)
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const getAllNumbers = () => {
    numberService.getAll().then(initialNumbers => {
      setPersons(initialNumbers)
      console.log("initial: ", initialNumbers)
    })
  }

  const deleteNumber = (id) => {
    numberService.deleteNumber(id).then(() => {
      const newNumber = persons.filter(person => person.id !== id)
      setPersons(newNumber)
    })
  }

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${id}?`)) {
      deleteNumber(id)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const existing = persons.some(person => person.name === newName)

    if (existing) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        updateNumber(person.id, { ...person, number: newNumber })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      addNumber(newPerson)
    }
  }

  useEffect(getAllNumbers, [])

  const filteredPersons = filter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()) ||
      person.number.toString().includes(filter)
    )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />

      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteNumber={handleDelete} />
    </div>
  )
}

export default App