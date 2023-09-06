import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  function areObjectsEqual(first, second) {
    return JSON.stringify(first) === JSON.stringify(second)
  }

  const onAddNewPersonClick = (event) => {
    event.preventDefault()
    const hasSame = persons.reduce((acc, value) => acc = (acc || areObjectsEqual(value, newPerson)), false)
    if (hasSame) {
      alert(`Person with name '${newPerson.name}' and number '${newPerson.number}' is already added to phonebook`)
    } else {
      setPersons([...persons, newPerson])
      setNewPerson({ name: '', number: '' })
    }
  }

  const handleNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value })
  }

  const handleNumberChange = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onAddNewPersonClick}>
        <div>
          name: <input
            value={newPerson.name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newPerson.number}
            onChange={handleNumberChange}
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
            return <li key={person.name}>{person.name} {person.number}</li>
          })
        }
      </ul>
    </div>
  )
}

export default App