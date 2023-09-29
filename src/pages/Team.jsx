import React, {useEffect ,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import PokemonTeamCard from '../components/PokemonTeamCard'
import { Link } from 'react-router-dom'

const List = styled.div `
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgb(0,0,0,0.9);
    color: white;
    min-height: 90vh;
    text-align: center;

    a{
        color: white;
    }

    .pokeList{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        height: 100%;
    }
`

const Team = () => {

    const [PokemonsTeam, setPokemonsTeam] = useState([])

    const SetAllPokemons = async () => {
        const initialData = JSON.parse(localStorage.getItem("team"))
        const pokemonData = await Promise.all(
          initialData.map(async (item) => {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${item}`)
            return result
        })
        )
        setPokemonsTeam(pokemonData)
    }

    useEffect(() => {
        SetAllPokemons()        
    },[])

    const removeFDP = (name) => {
        const item = JSON.parse(localStorage.getItem('team'))
        const filteredItems = item.filter(e => e !== name)
        localStorage.setItem('team', JSON.stringify(filteredItems))
        window.location.reload()
    }

  return (
    <List>
        <h1>Mon équipe</h1>
        {PokemonsTeam.length === 0 ? <h2>Vous n'avez pas encore d'équipe ? <br /> <Link to='/'>Sélectionnez les !</Link></h2>: <></>}
        {PokemonsTeam.length > 0 && 
            <div className="pokeList">
                {PokemonsTeam.map( (e,i) => (
                    <PokemonTeamCard poke={e} key={i} remove={(name) => removeFDP(name)}/>
                ))}
            </div>
        }
    </List>
  )
}

export default Team