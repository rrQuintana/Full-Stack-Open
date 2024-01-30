function Persons({ filteredPersons, deleteNumber }) {
  return (
    <div>
      {filteredPersons.map(person => (
        <div key={person.name}>
          <p>
            {person.name} - {person.number}
            <button onClick={() => deleteNumber(person.id)}>delete</button>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Persons