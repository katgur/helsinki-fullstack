import { useState } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [search, setSearch] = useState('')

  const onAddNewPersonClick = (data, reset) => {
    const hasSame = persons.reduce((acc, value) => acc = (acc || value.name === data.name || data.number === value.number), false)
    if (hasSame) {
      alert(`Person with name '${data.name}' or number '${data.number}' is already added to phonebook`)
    } else {
      setPersons([...persons, data])
      reset()
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new person</h3>
      <PersonForm onSubmit={onAddNewPersonClick} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App