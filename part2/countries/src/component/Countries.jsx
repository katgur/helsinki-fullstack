import { useEffect } from "react"
import { useState } from "react"
import countryService from '../service/countries'

function Country({ country }) {
    return (
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
    )
}

function Countries({ countries, search }) {
    const [country, setCountry] = useState(null)
    const [selected, setSelected] = useState(-1)
    const [mode, setMode] = useState()

    function getCountry(name) {
        countryService.getByName(name)
            .then(data => {
                setCountry({ name: data.name.common, capital: data.capital[0], area: data.area, languages: Object.values(data.languages), flag: data.flags.png, alt: data.flags.alt })
            })
    }

    useEffect(() => {
        const filtered = countries.filter(country => {
            return country.toLowerCase().includes(search)
        })

        if (filtered.length > 10) {
            setMode(0)
        } else if (filtered.length > 1) {
            setMode(1)
        } else {
            setMode(2)
            getCountry(filtered[0])
        }
    }, [countries, search, selected])

    useEffect(() => {
        const filtered = countries.filter(country => {
            return country.toLowerCase().includes(search)
        })
        if (selected !== -1) {
            getCountry(filtered[selected])
        }
    }, [selected])

    const onShowButtonClick = (index) => {
        setSelected(index)
    }

    return (
        <>
            {mode === 0 && <span>Too many countries, specify another filter</span>}
            {
                mode === 1 &&
                <ul>
                    {
                        countries
                            .filter(country => {
                                return country.toLowerCase().includes(search)
                            })
                            .map((fCountry, index) => {
                                return (
                                    <li key={fCountry}>
                                        <p>{fCountry} <button onClick={() => onShowButtonClick(index)}>show</button></p>
                                        {selected === index && <Country country={country} />}
                                    </li>
                                )
                            })
                    }
                </ul>
            }
            {mode === 2 && <Country country={country} />}
        </>
    )
}

export default Countries