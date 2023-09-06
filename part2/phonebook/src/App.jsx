import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  function areObjectsEqual(first, second) {
    return JSON.stringify(first) === JSON.stringify(second)
  }

  const onAddNewNameClick = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    const hasSame = persons.reduce((acc, value) => acc = (acc || areObjectsEqual(value, newPerson)), false)
    if (hasSame) {
      alert(`'${newName}' is already added to phonebook`)
    } else {
      setPersons([...persons, newPerson])
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onAddNewNameClick}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => {
            return <li key={person.name}>{person.name}</li>
          })
        }
      </ul>
    </div>
  )
}

export default App