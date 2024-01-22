import { useEffect, useState } from "react"
import axios from 'axios'

const Country = ({ country }) => {
  const { name, capital, population, languages, flags } = country

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h2>languages</h2>
      <ul>
        {Object.values(languages).map(languageName => (
          <li key={languageName}>{languageName}</li>
        ))}
      </ul>
      <img src={flags.png} alt={`${name} flag`} />
    </div>
  )
}

const CountriesHandler = ({ countries, setCountries, filter = "all" }) => {
  const countriesLength = countries.length

  const handleDetails = country => setCountries([country])

  if (countriesLength >= 3 && filter !== "all")
    return <p>Too many matches, specify another filter</p>

  if (countriesLength === 1 && filter !== "all")
    return <Country country={countries[0]} />

  return (
    countries.map(
      country =>
        <div key={country.name.official}>
          {country.name.official}
          <button onClick={()=>handleDetails(country)}>show</button>
        </div>
    )
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("all")

  const handleChangeFilter = (e) => {
    const value = e.target.value

    if (value === '') {
      setFilter("all")
    } else {
      setFilter(`name/${value}`)
    }
  }

  const hook = () => {
    console.log('effect', filter)
    axios
      .get(`https://restcountries.com/v3.1/${filter}`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [filter])

  return (
    <div>
      <div>
        find countries <input onChange={handleChangeFilter} />
      </div>
      <CountriesHandler countries={countries} setCountries={setCountries} filter={filter} />
    </div>
  )
}

export default App