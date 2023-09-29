import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PokemonCard  from '../components/PokemonCard'

const List = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgb(0,0,0,0.9);
    color: white;

    .pokeList{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        height: 100%;
    }
`

export const Home = () => {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        getPokemons()
    },[])

    const getPokemons = async () => {
        try{
            await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100')
            .then( res => res.json())
            .then((res) => setPokemons(res.results))
        }
        catch(err){
            console.log(err);
        }}    

  return (
    <>
    <List>
    <h1>Pokémons</h1>
    {pokemons.length === 0 && <h2>Loading...</h2>}
    <div className="pokeList">
        {pokemons.length > 0 && pokemons.map( (e,i) => (
            <PokemonCard team={false} name={e.name} id={i} key={i} />
        ))}
    </div>
    </List>
    </>
  )
}

export default Home;