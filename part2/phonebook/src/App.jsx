import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import personsService from './service/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const onAddNewPersonClick = (data, reset) => {
    const sameIndex = persons.findIndex(person => person.name === data.name)
    if (sameIndex !== -1) {
      if (window.confirm(`Person with name '${data.name}' is already added to phonebook, replace the old number with the new one ?`)) {
        personsService.update(persons[sameIndex].id, data)
        .then(data => {
          const newPersons = persons.filter(person => person.id !== data.id)
          setPersons([...newPersons, data])
        })
      }
    } else {
      personsService.create(data)
        .then(data => {
          setPersons([...persons, data])
          reset()
        })
    }
  }

  const onDeleteButtonClick = (data) => {
    if (window.confirm(`Delete ${data.name} ?`)) {
      personsService.remove(data.id)
        .then(_ => {
          const newPersons = persons.filter(person => person.id !== data.id)
          setPersons(newPersons)
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
      <Persons persons={persons} search={search} onDeleteButtonClick={onDeleteButtonClick} />
    </div>
  )
}

export default App