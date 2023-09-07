import { useEffect } from "react"
import { useState } from "react"
import countryService from '../service/countries'

function Countries({ countries, search }) {
    const [country, setCountry] = useState(null)

    const filtered = countries.filter(country => {
        return country.toLowerCase().includes(search)
    })

    useEffect(() => {
        if (filtered.length !== 1) {
            if (country) {
                setCountry(null)
            }
            return
        }
        if (!country) {
            countryService.getByName(filtered[0])
                .then(data => {
                    setCountry({ name: data.name.common, capital: data.capital[0], area: data.area, languages: Object.values(data.languages), flag: data.flags.png, alt: data.flags.alt })
                })
        }
    }, [filtered])

    return (
        <>
            {
                filtered.length > 10 && <span>Too many countries, specify another filter</span>}
            {
                filtered.length > 1 && filtered.length <= 10 &&
                <ul>
                    {
                        filtered.map(country => {
                            return <li key={country}>{country}</li>
                        })
                    }
                </ul>
            }
            {
                country &&
                <div>
                    <h1>{country.name}</h1>
                    <p>capital {country.capital}</p>
                    <p>area {country.area}</p>
                    <h3>languages:</h3>
                    <ul>
                        {
                            country.languages.map(language => {
                                return <li key={language}>{language}</li>
                            })
                        }
                    </ul>
                    <img src={country.flag} alt={country.alt} />
                </div>
            }
        </>
    )
}

export default Countries