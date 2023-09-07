import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const onAddNewPersonClick = (data, reset) => {
    const hasSame = persons.reduce((acc, value) => acc = (acc || value.name === data.name || data.number === value.number), false)
    if (hasSame) {
      alert(`Person with name '${data.name}' or number '${data.number}' is already added to phonebook`)
    } else {
      axios.post('http://localhost:3001/persons', data)
      .then(response => {
        setPersons([...persons, response.data])
        reset()
      })
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