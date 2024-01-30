function PersonForm({handleSubmit, newName, newNumber, handleChangeName, handleChangeNumber }) {
  return (
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} /> <br />
          number: <input value={newNumber} onChange={handleChangeNumber} type='number' />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm