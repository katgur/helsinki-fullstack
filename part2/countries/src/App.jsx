import { useState, useEffect } from 'react'
import countryService from './service/countries'
import Countries from './component/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countryService.getAll()
      .then(data => {
        setCountries(data.map(d => d.name.common))
      })
  }, [])

  return (
    <div>
      <div>
        <label>find countries</label>
        <input value={search} onChange={(event) => setSearch(event.target.value.toLowerCase())} />
      </div>
      <Countries countries={countries} search={search} />
    </div>
  )
}

export default App