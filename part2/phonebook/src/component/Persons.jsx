function Persons({ persons, search }) {
    return (
        <ul>
            {
                persons
                    .filter(person => person.name.toLowerCase().includes(search) || person.number.includes(search))
                    .map(person => {
                        return <li key={person.name}>{person.name} {person.number}</li>
                    })
            }
        </ul>
    )
}

export default Persons